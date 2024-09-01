import { IUrl, IUrlFromServer } from '../../../definitions';
import parseUrls from './parseUrls';

const tmpImageValidLink = {
	urls: [
		{
			url: 'https://meet.google.com/cbr-hysk-azn?pli=1&authuser=1',
			meta: {
				pageTitle: 'Meet',
				description:
					'Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.',
				twitterCard: 'summary',
				ogUrl: 'https://meet.google.com',
				ogType: 'website',
				ogTitle: 'Meet',
				ogDescription:
					'Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.',
				ogImage: 'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png'
			},
			headers: {
				contentType: 'text/html; charset=utf-8'
			},
			parsedUrl: {
				host: 'meet.google.com',
				hash: null,
				pathname: '/cbr-hysk-azn',
				protocol: 'https:',
				port: null,
				query: 'pli=1&authuser=1',
				search: '?pli=1&authuser=1',
				hostname: 'meet.google.com'
			}
		}
	],
	expectedResult: [
		{
			_id: 0,
			title: 'Meet',
			description:
				'Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.',
			image: 'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-96dp/logo_meet_2020q4_color_2x_web_96dp.png',
			url: 'https://meet.google.com/cbr-hysk-azn?pli=1&authuser=1'
		}
	]
} as { urls: IUrlFromServer[]; expectedResult: IUrl[] };

const tmpImagePointingToAnAsset = {
	urls: [
		{
			url: 'https://thecortex.cortexflex.org/',
			meta: {
				pageTitle: 'Rocket.Chat',
				msapplicationTileImage: 'assets/tile_144.png',
				msapplicationConfig: 'images/browserconfig.xml',
				ogImage: 'assets/favicon_512.png',
				twitterImage: 'assets/favicon_512.png',
				appleMobileWebAppTitle: 'Rocket.Chat',
				fbAppId: '835103589938459'
			},
			headers: {
				contentType: 'text/html; charset=utf-8'
			}
		}
	],
	expectedResult: [
		{
			_id: 0,
			title: 'Rocket.Chat',
			image: 'https://thecortex.cortexflex.org/assets/favicon_512.png',
			url: 'https://thecortex.cortexflex.org/'
		}
	]
} as unknown as { urls: IUrlFromServer[]; expectedResult: IUrl[] };

const tmpImagePointingToAnAssetThatStartsWithSlashWithoutParsedUrl = {
	urls: [
		{
			url: 'https://thecortex.cortexflex.org/',
			meta: {
				pageTitle: 'Rocket.Chat',
				msapplicationTileImage: 'assets/tile_144.png',
				msapplicationConfig: 'images/browserconfig.xml',
				ogImage: '/assets/favicon_512.png',
				twitterImage: '/assets/favicon_512.png',
				appleMobileWebAppTitle: 'Rocket.Chat',
				fbAppId: '835103589938459'
			},
			headers: {
				contentType: 'text/html; charset=utf-8'
			}
		}
	],
	expectedResult: [
		{
			_id: 0,
			title: 'Rocket.Chat',
			image: 'https://thecortex.cortexflex.org/assets/favicon_512.png',
			url: 'https://thecortex.cortexflex.org/'
		}
	]
} as unknown as { urls: IUrlFromServer[]; expectedResult: IUrl[] };

const tmpImagePointingToAnAssetThatStartsWithSlashWithParsedUrl = {
	urls: [
		{
			url: 'https://thecortex.cortexflex.org/',
			meta: {
				pageTitle: 'Rocket.Chat',
				msapplicationTileImage: 'assets/tile_144.png',
				msapplicationConfig: 'images/browserconfig.xml',
				ogImage: '/assets/favicon_512.png',
				twitterImage: '/assets/favicon_512.png',
				appleMobileWebAppTitle: 'Rocket.Chat',
				fbAppId: '835103589938459'
			},
			headers: {
				contentType: 'text/html; charset=utf-8'
			},
			parsedUrl: {
				hash: '',
				host: 'thecortex.cortexflex.org',
				hostname: 'thecortex.cortexflex.org',
				pathname: '/',
				port: '',
				protocol: 'https:',
				search: '',
				query: 'pli=1&authuser=1'
			}
		}
	],
	expectedResult: [
		{
			_id: 0,
			title: 'Rocket.Chat',
			image: 'https://thecortex.cortexflex.org/assets/favicon_512.png',
			url: 'https://thecortex.cortexflex.org/'
		}
	]
} as unknown as { urls: IUrlFromServer[]; expectedResult: IUrl[] };

const tmpImagePointingToAnAssetThatStartsWithDoubleSlashWithParsedUrl = {
	urls: [
		{
			url: 'https://thecortex.cortexflex.org/',
			meta: {
				pageTitle: 'Rocket.Chat',
				msapplicationTileImage: 'assets/tile_144.png',
				msapplicationConfig: 'images/browserconfig.xml',
				ogImage: '//assets/favicon_512.png',
				twitterImage: '//assets/favicon_512.png',
				appleMobileWebAppTitle: 'Rocket.Chat',
				fbAppId: '835103589938459'
			},
			headers: {
				contentType: 'text/html; charset=utf-8'
			},
			parsedUrl: {
				host: 'thecortex.cortexflex.org',
				hash: null,
				protocol: 'https:',
				port: null,
				hostname: 'thecortex.cortexflex.org'
			}
		}
	],
	expectedResult: [
		{
			_id: 0,
			title: 'Rocket.Chat',
			image: 'https://thecortex.cortexflex.org/assets/favicon_512.png',
			url: 'https://thecortex.cortexflex.org/'
		}
	]
} as unknown as { urls: IUrlFromServer[]; expectedResult: IUrl[] };

const tmpImagePointingToAnAssetThatStartsWithDoubleSlashWithoutParsedUrl = {
	urls: [
		{
			url: 'https://thecortex.cortexflex.org/',
			meta: {
				pageTitle: 'Rocket.Chat',
				msapplicationTileImage: 'assets/tile_144.png',
				msapplicationConfig: 'images/browserconfig.xml',
				ogImage: '//assets/favicon_512.png',
				twitterImage: '//assets/favicon_512.png',
				appleMobileWebAppTitle: 'Rocket.Chat',
				fbAppId: '835103589938459'
			},
			headers: {
				contentType: 'text/html; charset=utf-8'
			}
		}
	],
	expectedResult: [
		{
			_id: 0,
			title: 'Rocket.Chat',
			image: 'https://thecortex.cortexflex.org/assets/favicon_512.png',
			url: 'https://thecortex.cortexflex.org/'
		}
	]
} as unknown as { urls: IUrlFromServer[]; expectedResult: IUrl[] };

describe('parseUrls function', () => {
	it('test when a tmp.image is a valid link', () => {
		const result = parseUrls(tmpImageValidLink.urls);
		expect(result).toEqual(tmpImageValidLink.expectedResult);
	});

	it('test when a tmp.image is assets/favicon_512.png', () => {
		const result = parseUrls(tmpImagePointingToAnAsset.urls);
		expect(result).toEqual(tmpImagePointingToAnAsset.expectedResult);
	});

	it('test when a tmp.image is /assets/favicon_512.png and url with parsedUrl, parsedUrl.protocol and parsedUrl.host', () => {
		const result = parseUrls(tmpImagePointingToAnAssetThatStartsWithSlashWithParsedUrl.urls);
		expect(result).toEqual(tmpImagePointingToAnAssetThatStartsWithSlashWithParsedUrl.expectedResult);
	});

	it('test when a tmp.image is /assets/favicon_512.png and url without parsedUrl', () => {
		const result = parseUrls(tmpImagePointingToAnAssetThatStartsWithSlashWithoutParsedUrl.urls);
		expect(result).toEqual(tmpImagePointingToAnAssetThatStartsWithSlashWithoutParsedUrl.expectedResult);
	});

	it('test when a tmp.image is //assets/favicon_512.png and url with parsedUrl', () => {
		const result = parseUrls(tmpImagePointingToAnAssetThatStartsWithDoubleSlashWithParsedUrl.urls);
		expect(result).toEqual(tmpImagePointingToAnAssetThatStartsWithDoubleSlashWithParsedUrl.expectedResult);
	});

	it('test when a tmp.image is //assets/favicon_512.png and url without parsedUrl', () => {
		const result = parseUrls(tmpImagePointingToAnAssetThatStartsWithDoubleSlashWithoutParsedUrl.urls);
		expect(result).toEqual(tmpImagePointingToAnAssetThatStartsWithDoubleSlashWithoutParsedUrl.expectedResult);
	});
});
