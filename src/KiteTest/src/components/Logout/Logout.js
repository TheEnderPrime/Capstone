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
  AsyncStorage,
} from 'react-native';

import styles from './styles';

export default class Logout extends Component {
	constructor(){
		super()
		this.state={}
  }
  
  // simply shows a page then takes the user to the welcome screen where they must login again
	componentWillMount(){
    AsyncStorage.setItem('userID', null);
		setTimeout(() => {
			this.props.navigation.navigate('WelcomeStack')
        },750)
        
	}
	
  render() {
    return (
    	<View style={styles.container}>
	  		<View style={styles.logo}>
				<Text style={styles.logoText}>Bye! Hope to see you soon!</Text>
			</View>
    	</View>
    );
  }
}

