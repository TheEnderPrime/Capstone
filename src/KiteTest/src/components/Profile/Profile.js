import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';

class Profile extends React.Component {

	static propTypes = {
				//: PropTypes.object.isRequired,
				//: PropTypes.func.isRequired,
		};

		state = {
				//deal: this.props.initialDealData,
				//imageIndex: 0,
		};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.middleBar}>
					<Text>Profile</Text>
				</View>
			</View>

		);
	}
}



	export default Profile;