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

	static propTypes = {
				//: PropTypes.object.isRequired,
				//: PropTypes.func.isRequired,
		};

		state = {
		EventTitle: "",
		EventDesc: "",
		EventTags: "",
		};

	render() {
		return (
			<View style={styles.container}>
			
			<Text style={styles.titleText}>
				Now, tell your Story!
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