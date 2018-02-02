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

export default class Splash extends React.Component {
	constructor(){
		super()
		this.state={
			showMe:true
		}
	}
	componentWillMount(){
		setTimeout(() => {
			this.props.navigation.navigate('Welcome') // - Change me to see a new page right after the Splash screen -
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

