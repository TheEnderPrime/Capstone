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
} from 'react-native';

class Login extends React.Component {

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
				<TextInput
                    style={styles.textInputBox}
                    onChangeText={(text) => this.setState({usernameText})}
                    value={this.state.usernameText}
                    
                />
                <TextInput
                    style={styles.textInputBox}
                    onChangeText={(text) => this.setState({passwordText})}
                    value={this.state.passwordText}
                />
				<View style={styles.button}>
					<Button title="Login" onPress={() => {}} />
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
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection)
    	alignContent: 'center', // cross axis (opposite of the flexDirection)
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
    textInputBox: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    },  
});




  export default Login;