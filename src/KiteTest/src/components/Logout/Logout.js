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
	componentWillMount(){
		setTimeout(() => {
			this.props.navigation.navigate('WelcomeStack')
        },750)
        AsyncStorage.setItem('userID', null);
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

