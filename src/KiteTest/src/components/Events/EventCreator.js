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
			EventTitle: "a",
			EventDesc: "a",
			userID: 0,
			EventID: 0,
		};
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		// const {params} = this.props.navigation.state;
		// const Title = params ? params.EventTitle : null;
		// const Desc =  params ? params.EventDesc : null;
		// this.setState({EventTitle: Title});
		// this.setState({EventDesc: Desc});
		//if(this.state.userId != null){
		//	this.GatherUserInformation(this.state.userId);
		//}
	}

	UserCreateEvent = () => {
		const { EventID } = this.state;
		const { userID } = this.state;
		const { EventTitle} = this.state;
		const { EventDesc } = this.state;


		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Event.php?f=createEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: userID,

                title: EventTitle,

				desc: EventDesc,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
					const eventID = responseJson.EventID;
                    this.props.navigation.navigate('Event', {EventTitle, EventDesc, eventID})
                } 
                else {
                    Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
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
						//onSubmitEditing={() => this.tagsInput.focus()}
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={(EventDesc) => this.setState({ EventDesc })}
						ref={(input) => this.descriptionInput = input}
					/>
				</View>

			</View>
			
			<View style={styles.button}>
			<Button 
				style={buttonColor = '#78B494'} 
				title="Create Event" 
				onPress = {() => this.UserCreateEvent()}
					/>
			</View>
    	</View>

    );
  }
}



  export default EventCreator;