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
import LoginForm from './LoginForm'

export default class Login extends Component {
	static navigationOptions = {
		title: 'Login',
	};
	static propTypes = {
		//: PropTypes.object.isRequired,
		//: PropTypes.func.isRequired,
	};

	state = {
		usernameText: 'Username/Email',
		passwordText: 'Password',
		//deal: this.props.initialDealData,
		//imageIndex: 0,
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
		backgroundColor: 'darkgray',
	},
	logo: {

	},
	logoText: {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 40,
		textAlign: 'center',
	},
	welcome: {
	},
	welcomeWords: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 50,
		fontSize: 30,
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
		borderColor: 'gray',
		borderWidth: 1
	},
});

AppRegistry.registerComponent('Login', () => Login);