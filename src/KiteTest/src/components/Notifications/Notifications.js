import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	TextInput,
	AsyncStorage,
} from 'react-native';

import styles from './styles';

export default class Logout extends Component {
	constructor() {
		super()
		this.state = {

		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<Text style={styles.logoText}>Hello! This is a stretch goal!</Text>
				</View>
			</View>
		);
	}
}

