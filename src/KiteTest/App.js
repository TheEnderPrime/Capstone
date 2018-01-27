import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import Welcome from './src/components/Welcome/Welcome';
import Login from './src/components/Login/Login';
import Signup from './src/components/Signup/Signup';
import Splash from './src/components/Splash/Splash';
import Timeline from './src/components/Timeline/Timeline'



export default class App extends Component {

  render() {
    return (
      <Menus/>
		
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
	},
});

