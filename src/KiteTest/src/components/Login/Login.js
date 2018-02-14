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
	AppRegistry,
} from 'react-native';

import LoginForm from './LoginForm';
import styles from './styles';
import{ Root, Tabs, WelcomeStack } from '../../config/router';

export default class Login extends Component {

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<Text style={styles.logoText}>Kite</Text>
				</View>
				<View style={styles.welcome}>
					<Text style={styles.welcomeWords}>Welcome Back!</Text>
					<LoginForm navigation={navigation} />
				</View>
			</View>
		);
	}
}



AppRegistry.registerComponent('Login', () => Login);