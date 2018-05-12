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
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Input } from 'react-native-elements';
import Colors from '../../Colors/Colors';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class EventEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			eventTitle: "",
			eventDesc: "",
			userID: 0,
			eventID: 0,
			communityID: 'false'
		};
	}

	// sends given data to database to create event
	updateEvent = () => {
		// Alert.alert("update: " + this.state.userID + " : " + this.state.eventID + " : " + this.state.title + " :" + this.state.description)
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Event.php?f=updateEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: this.state.userID,

				EventID: this.state.eventID,

                Title: this.state.title,

				Description: this.state.description,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as valid
                if (responseJson.isValid === 'valid') {
					
					this.props.navigation.navigate('Event', {eventID: this.state.eventID})
					
                } 
                else {
                    Alert.alert(responseJson.errorMessage);
                }

            }).catch((error) => {
                console.error(error);
            });
	}

	componentDidMount(){
		// const user = await AsyncStorage.getItem('userID')
		// await this.setUserIdAsync({userID: user});
		const {params} = this.props.navigation.state;
		const EventID = params ? params.eventID : null;
		const UserID = params ? params.userID : null;
		const Title = params ? params.title : null;
		const Description = params ? params.description : null;
		this.setState({eventID: EventID});
		this.setState({userID: UserID});
		this.setState({title: Title});
		this.setState({description: Description});
	}


  	render() {
		const {navigate} = this.props.navigation;
		return (

			<View style={styles.container}>
				
			<View style={styles.titleView}>
				<Text style={styles.Title}>
					Edit Your Event
				</Text>
			</View>
				
			<View style={styles.textBox}>
				<Text style={styles.text}>
					What is the new title of your Event?
				</Text>
				<Input inputContainerStyle={{ 
					borderRadius: 40, 
					borderWidth: 1, 
					borderColor: "rgba(110, 120, 170, 1)", 
					height: 50, 
					width: SCREEN_WIDTH - 50, 
					marginVertical: 10 }} 
					
					leftIcon={
						<SimpleIcon 
							name="user"
							color="rgba(110, 120, 170, 1)" 
							size={25} 
						/>
					} 
					iconContainerStyle={{ marginLeft: 20 }} 
					placeholder="Event Title" 
					placeholderTextColor="rgba(110, 120, 170, 1)" 
					inputStyle={{ marginLeft: 10, color: "white" }} 
					autoCapitalize="none" 
					autoCorrect={false} 
					keyboardAppearance="light" 
					keyboardType="default" 
					returnKeyType="next" 
					ref={input => (this.usernameInput = input)} 
					onSubmitEditing={() => this.descriptionInput.focus()} 
					onChangeText={(title ) => this.setState({ title })}
					blurOnSubmit={false} 
				/>
			</View>
				
			<View style={styles.textBox}>
				<Text style={styles.text}>
					Edit your events description.
				</Text>
				<Input inputContainerStyle={{ 
					borderRadius: 40, 
					borderWidth: 1, 
					borderColor: "rgba(110, 120, 170, 1)", 
					height: 50, 
					width: SCREEN_WIDTH - 50, 
					marginVertical: 10 }} 
					
					leftIcon={
						<SimpleIcon 
							name="user"
							color="rgba(110, 120, 170, 1)" 
							size={25} 
						/>
					} 
					iconContainerStyle={{ marginLeft: 20 }} 
					placeholder="Event Description" 
					placeholderTextColor="rgba(110, 120, 170, 1)" 
					inputStyle={{ marginLeft: 10, color: "white" }} 
					autoCapitalize="none" 
					autoCorrect={false} 
					keyboardAppearance="light" 
					keyboardType="default" 
					returnKeyType="next" 
					ref={input => (this.usernameInput = input)} 
					onSubmitEditing={() => this.descriptionInput.focus()} 
					onChangeText={(description) => this.setState({ description })}
					ref={(input) => this.descriptionInput = input}
					blurOnSubmit={false} 
				/>
			</View>
			
			<View style={styles.button}>
				<Button 
					style={buttonColor = "#78B494"} 
					title="Create Event" 
					onPress = {() => this.updateEvent()}
				/>
			</View>
			</View>
		);
	}
}