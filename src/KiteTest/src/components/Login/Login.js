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

export default class Login extends Component {
	static navigationOptions = {
		title: 'Login',
		headerStyle: {
            backgroundColor: '#78B494',
        },
        headerTitleStyle: {
            color: '#D5EAE0',
        },
        headerBackTitleStyle: {
            color: '#D5EAE0',
        },
        headerTintColor: '#D5EAE0',
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<Text style={styles.logoText}>Kite</Text>
				</View>
				<View style={styles.welcome}>
					<Text style={styles.welcomeWords}>Welcome Back!</Text>
					<LoginForm />
				</View>
			</View>
		);
	}
}



AppRegistry.registerComponent('Login', () => Login);