import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

import { themes } from '../../constants/colors';
import Avatar from '../../containers/Avatar';

const styles = StyleSheet.create({
	avatar: {
		borderRadius: 10,
		marginHorizontal: 16
	}
});

interface IRoomLeftButtons {
	tmid: string;
	unreadsCount: number;
	navigation: any; // TODO - change this after merge react navigation
	baseUrl: string;
	userId: string;
	token: string;
	title: string;
	t: string;
	theme: string;
	goRoomActionsView: Function;
	isMasterDetail: boolean;
}

const LeftButtons = React.memo(
	({
		tmid,
		unreadsCount,
		navigation,
		baseUrl,
		userId,
		token,
		title,
		t,
		theme,
		goRoomActionsView,
		isMasterDetail
	}: IRoomLeftButtons) => {
		if (!isMasterDetail || tmid) {
			const onPress = useCallback(() => navigation.goBack(), []);
			const label: any = unreadsCount > 99 ? '+99' : unreadsCount || ' ';
			const labelLength = label.length ? label.length : 1;
			const marginLeft = -2 * labelLength;
			const fontSize = labelLength > 1 ? 14 : 17;
			return (
				<HeaderBackButton
					label={label}
					onPress={onPress}
					tintColor={themes[theme].headerTintColor}
					labelStyle={{ fontSize, marginLeft }}
				/>
			);
		}
		const onPress = useCallback(() => goRoomActionsView(), []);

		if (baseUrl && userId && token) {
			return <Avatar text={title} size={30} type={t} style={styles.avatar} onPress={onPress} />;
		}
		return null;
	}
);

export default LeftButtons;