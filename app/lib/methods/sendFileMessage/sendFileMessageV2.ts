import { settings as RocketChatSettings } from '@rocket.chat/sdk';

import { IUploadFile, IUser, TUploadModel } from '../../../definitions';
import database from '../../database';
import { Encryption } from '../../encryption';
import { createUploadRecord, persistUploadError, uploadQueue } from './utils';
import FileUpload from '../helpers/fileUpload';
import { IFileUpload } from '../helpers/fileUpload/definitions';

export async function sendFileMessageV2(
	rid: string,
	fileInfo: IUploadFile,
	tmid: string | undefined,
	server: string,
	user: Partial<Pick<IUser, 'id' | 'token'>>,
	isForceTryAgain?: boolean
): Promise<void> {
	let uploadPath: string | null = '';
	let uploadRecord: TUploadModel | null;
	try {
		console.log('sendFileMessage', rid, fileInfo);
		const { id, token } = user;
		const headers = {
			...RocketChatSettings.customHeaders,
			'Content-Type': 'multipart/form-data',
			'X-Auth-Token': token,
			'X-User-Id': id
		};
		const db = database.active;

		[uploadPath, uploadRecord] = await createUploadRecord({ rid, fileInfo, tmid, isForceTryAgain });
		if (!uploadPath || !uploadRecord) {
			throw new Error("Couldn't create upload record");
		}
		const { file, getContent } = await Encryption.encryptFile(rid, fileInfo);

		const formData: IFileUpload[] = [];
		formData.push({
			name: 'file',
			type: file.type,
			filename: file.name,
			uri: file.path
		});

		uploadQueue[uploadPath] = new FileUpload(`${server}/api/v1/rooms.media/${rid}`, headers, formData, async (loaded, total) => {
			try {
				await db.write(async () => {
					await uploadRecord?.update(u => {
						u.progress = Math.floor((loaded / total) * 100);
					});
				});
			} catch (e) {
				console.error(e);
			}
		});
		const response = await uploadQueue[uploadPath].send();

		let content;
		if (getContent) {
			content = await getContent(response.file._id, response.file.url);
		}
		await fetch(`${server}/api/v1/rooms.mediaConfirm/${rid}/${response.file._id}`, {
			method: 'POST',
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				msg: file.msg || undefined,
				tmid: tmid || undefined,
				description: file.description || undefined,
				t: content ? 'e2e' : undefined,
				content
			})
		});
		await db.write(async () => {
			await uploadRecord?.destroyPermanently();
		});
	} catch (e: any) {
		if (uploadPath && !uploadQueue[uploadPath]) {
			console.log('Upload cancelled');
		} else {
			await persistUploadError(fileInfo.path, rid);
			throw e;
		}
	}
}
