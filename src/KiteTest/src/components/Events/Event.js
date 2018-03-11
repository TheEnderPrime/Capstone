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
	Alert,
	AsyncStorage,
} from 'react-native';

import Colors from '../../Colors/Colors';
import styles from './styles';

class Event extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userId: 0,
			EventTitle: "",
			EventDesc: "",
			EventTags: "",
			EventStory: "",
		};
	}

	
	render() {

		return (
			<View style={styles.container}>
			
				<Text>Event</Text>

				
			</View>

		);
	}
}



	export default Event;