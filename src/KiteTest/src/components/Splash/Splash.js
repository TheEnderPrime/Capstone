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

import styles from './styles';
import{ Root, Tabs, WelcomeStack } from '../../config/router'; //eventually should call WelcomeStack

export default class Splash extends Component {
	constructor(){
		super()
		this.state={
			showMe:true
		}
	}

	// shows page for .75 of a second then navigates to Welcome page
	componentWillMount(){
		setTimeout(() => {
			this.props.navigation.navigate('WelcomeStack')
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

