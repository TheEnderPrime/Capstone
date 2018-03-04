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

class Events extends React.Component {

	constructor(props) {
		super(props);
		state = {
			EventTitle: "",
			EventDesc: "",
			EventTags: "",
		};
	}

  render() {
	const {navigate} = this.props.navigation;
    return (
    	<View style={styles.container}>
			
			<Text style={styles.titleText}>
				What story are you going to tell?
			</Text>
			
			<View style={styles.textInput}>
				<View style={styles.textBox}>
					<Text style={styles.text}>
						What is the title of your Event?
					</Text>
					<TextInput
						style={styles.textBox}
						placeholder="Event Title"
						placeholderTextColor={Colors.kite_greenMediumDark}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={(EventTitle) => this.setState({ EventTitle })}
					/>
				</View>

				<View style={styles.textBox}>
					<Text style={styles.text}>
						Tells us briefly what your event is about.
					</Text>
					<TextInput
						style={styles.textBox}
						placeholder="Event Description"
						placeholderTextColor={Colors.kite_greenMediumDark}
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={(EventDesc) => this.setState({ EventDesc })}
					/>
				</View>

				<View style={styles.textBox}>
					<Text style={styles.text}>
						What tags fit your event?
					</Text>
					<TextInput
						style={styles.textBox}
						placeholder="Tags"
						placeholderTextColor={Colors.kite_greenMediumDark}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={(EventTags) => this.setState({ EventTags })}
					/>
				</View>
			</View>
			
			<View style={styles.button}>
				<Button 
					title="Continue"
					onPress = {() => 
						navigate('EventCreator', {	EventTitle: "EventTitle", EventDesc: "EventDesc", EventTags: "Why Me!"})
					}
				/>
			</View>
    	</View>

    );
  }
}



  export default Events;