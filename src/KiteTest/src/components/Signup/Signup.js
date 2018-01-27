import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	AppRegistry,


} from 'react-native';

import SignupForm from './SignupForm';
import styles from './styles';

export default class Signup extends React.Component {
	static navigationOptions ={
		title: 'Signup',
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
					<Text style={styles.welcomeWords}>Sign up for Kite!</Text>
					<SignupForm />
				</View>
			</View>
		);
	}
}

AppRegistry.registerComponent('Signup', () => Signup);