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
} from 'react-native';
export default class Welcome extends Component {
	static navigationOptions = {
		title: 'Welcome',
	};
	static propTypes = {
        //: PropTypes.object.isRequired,
        //: PropTypes.func.isRequired,
    };

    state = {
        //deal: this.props.initialDealData,
        //imageIndex: 0,
    };

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
				<Text style={styles.selections}>Sign In</Text>
				<Text style={styles.selections}>Sign Up</Text>
			</View>
			<View style={styles.loginBox}>
				<View style={styles.button}>
					<Button title="Log In" onPress={() => navigate('Login')} />
				</View>
				<View style={styles.button}>
					<Button title="Sign Up" onPress={() => navigate('Signup')} />
				</View>
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
    	backgroundColor: '#0848af',
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
  	}, 
  	welcome: {
		flex: 1,
  	},
  	welcomeWords: {
    	textAlign: 'center',
		marginTop: 10,
		marginBottom: 50,
		fontSize: 20,
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
