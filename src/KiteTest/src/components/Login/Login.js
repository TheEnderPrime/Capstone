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

const styles = StyleSheet.create({
	container: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection)
		alignContent: 'center', // cross axis (opposite of the flexDirection)
		backgroundColor: '#A6CFBD',
	},
	logo: {

	},
	logoText: {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 40,
		textAlign: 'center',
		color: '#277552'
	},
	welcome: {
	},
	welcomeWords: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 20,
		fontSize: 30,
		color: '#277552'
	},
	button: {
		marginTop: 20,
		marginBottom: 20,
	},
	password: {
		marginTop: 5,
		textAlign: 'center',
	},
	textInputBox: {
		height: 40,
	},
});

AppRegistry.registerComponent('Login', () => Login);