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

class Login extends React.Component {

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
	  		<View style={styles.logo}>
				<Text style={styles.logoText}>Kite</Text>
			</View>
			<View style={styles.welcome}>
				<Text style={styles.welcomeWords}>Welcome to the Kite App!</Text>
				<View style={styles.button}>
					<Button title="Log In" onPress={() => {}} />
				</View>
				<View style={styles.button}>
					<Button title="Sign Up" onPress={() => {}} />
				</View>
				<TouchableOpacity onPress={() => {}}> 
        			<Text style={styles.password}> Forgot Password?</Text>
          		</TouchableOpacity>
				
			</View>
    	</View>
    );
  }
}

const styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
    	alignContent: 'center',
    	backgroundColor: '#0848af',
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
		fontSize: 20,
  	},
  	button: {
    	marginTop: 20,
    	marginBottom: 20,
  	},
  	password: {
   	 	marginTop: 5,
    	textAlign: 'center',
  	},
});




  export default Login;