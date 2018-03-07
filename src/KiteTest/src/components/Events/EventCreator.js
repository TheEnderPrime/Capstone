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

import Colors from '../../Colors/Colors';
import styles from './styles';

class EventCreator extends React.Component {

	constructor(props) {
		super(props);
		state = {
			EventTitle: "",
			EventDesc: "",
			EventTags: "",
		};
	}

	// componentWillMount(){
	// 	this.state.EventTitle.setState(EventTitle);
	// }

	render() {

		const {params} = this.props.navigation.state;
		const EventTitle = params ? params.EventTitle : null;
		const EventTags = params ? params.EventTags : null;

		return (
			<View style={styles.container}>
			
			<Text style={styles.titleText}>
				Now, tell your Story! {EventTitle} {EventTags}
			</Text>
			
			<View style={styles.textInput}>
				<View style={styles.textBox}>
					<Text style={styles.text}>
						
					</Text>
					<TextInput
						style={styles.textBox}
						placeholder="Tell your story!"
						placeholderTextColor={Colors.kite_greenMediumDark}
						keyboardType="default"
						autogrow={true}
						multiline={true}
						maxHeight={350}
						autoCorrect={true}
						onChangeText={(EventTitle) => this.setState({ EventTitle })}
					/>
				</View>
			</View>
			
			<View style={styles.button}>
				<Button 
					title="Create!"
					onPress = {() => {}}
				/>
			</View>
			
			
			</View>

		);
	}
}



	export default EventCreator;