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

export default class Splash extends React.Component {
	static navigationOptions = {
		header:null
	};
	constructor(){
		super()
		this.state={
			showMe:true
		}
	}
	componentWillMount(){
		setTimeout(() => {
			this.props.navigation.navigate('Welcome')
		},750)
	}
  render() {
    return (
    	<View style={styles.container}>
	  		<View style={styles.logo}>
				<Text style={styles.logoText}>Kite</Text>
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
    	backgroundColor: '#78B494',
  	},
  	logo: {
		
 	},
  	logoText: {
		marginTop: 15,
		marginBottom: 15,
    	fontSize: 60,
    	textAlign: 'center',
		color: '#D5EAE0'
  	}, 
  	welcome: {
  	},
  	welcomeWords: {
    	textAlign: 'center',
		marginTop: 10,
		marginBottom: 50,
		fontSize: 20,
  	},
});