import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  AppRegistry,
  BackHandler,
} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
	static navigationOptions = {
		title: 'Welcome',
		headerLeft: null,
		headerStyle: {
            backgroundColor: '#78B494',
        },
        headerTitleStyle: {
			alignSelf: 'center',
            color: '#D5EAE0',
        },
        headerBackTitleStyle: {
            color: '#D5EAE0',
        },
        headerTintColor: '#D5EAE0',
	};
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
	}

	onBackButtonPressed() {
		return true;
	}
	render() {
		const{ navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<Text style={styles.logoText}>Kite</Text>
				</View>
				<View style={styles.welcome}>
					<Text style={styles.welcomeWords}>Welcome to the Kite App!</Text>
				</View>
				<View style={styles.selectionBox}>
					<Text style={styles.selections} onPress={() => navigate('Login')}>Sign In</Text>
					<Text style={styles.selections} onPress={() => navigate('Signup')}>Sign Up</Text>
				</View>
				<View style={styles.loginBox}>
					<TouchableOpacity onPress={() => {}}> 
						<Text style={styles.forgotPassword}> Forgot Password?</Text>
					</TouchableOpacity>

				</View>
			</View>
		);
	}
}


AppRegistry.registerComponent('Welcome', () => Welcome);
