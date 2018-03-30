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
  Alert,
} from 'react-native';

import Colors from '../../Colors/Colors';
import styles from './styles';

class EventCreator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventTitle: "a",
			eventDesc: "a",
			userID: 0,
			eventID: 0,
		};
	}

	

	createEvent = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Event.php?f=createEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: this.state.userID,

                title: this.state.eventTitle,

				desc: this.state.eventDesc,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as valid
                if (responseJson.isValid === 'valid') {
					
					const eventID = responseJson.EventID;

					this.props.navigation.navigate('Event', {eventID})
					
                } 
                else {
                    Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
	}
	
	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		//this.loadTimeline();
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
							onSubmitEditing={() => this.descriptionInput.focus()}
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(eventTitle) => this.setState({ eventTitle })}
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
							onChangeText={(eventDesc) => this.setState({ eventDesc })}
							ref={(input) => this.descriptionInput = input}
						/>
					</View>

				</View>
				
				<View style={styles.button}>
				<Button 
					style={buttonColor = '#78B494'} 
					title="Create Event" 
					onPress = {() => this.createEvent()}
						/>
				</View>
			</View>

		);
	}
}



  export default EventCreator;