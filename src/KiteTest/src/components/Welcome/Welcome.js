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

const styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column', //column or row
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignContent: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
  	},
  	logo: {
		// this will contain the logo and welcome words
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
  	logoText: {
		marginTop: 15,
		marginBottom: 15,
    	fontSize: 40,
    	textAlign: 'center',
		color: '#277552'
  	}, 
  	welcome: {
		flex: 1,
		marginBottom: 100,
  	},
  	welcomeWords: {
    	textAlign: 'center',
		marginTop: 10,
		
		fontSize: 30,
		color: '#277552',
	},
	selectionBox: { // this will contain both of the signin and signup selections containers 
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	selections: {
		// this wil contain each of the signin and signup texts and might change the text to be dark if needed
		fontSize: 20,
		color: '#277552'
	},
	loginBox: {
		flex: 2,

		// this will contain username, password textInputs, and the Login button
	},
  	button: {
    	marginTop: 20,
    	marginBottom: 20,
  	},
  	forgotPassword: {
   	 	marginTop: 5,
    	textAlign: 'center',
  	},
})
AppRegistry.registerComponent('Welcome', () => Welcome);
