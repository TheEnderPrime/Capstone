import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import Login from './src/components/Login/Login';

export default class App extends Component {

  render() {
    return (
    	<Login />
		
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
	},
});

