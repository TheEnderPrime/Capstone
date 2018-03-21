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

class PostCreator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userID: 0,
			eventID: 0,
			UserTitle: "",
			UserDesc: "",
			UserStory: "",
		};
	}

	UserCreatePost = () => {
		const { userID } 	= this.state;
        const { UserTitle }	= this.state;
		const { UserDesc } 	= this.state;
		const { UserStory } = this.state;


		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=createPost', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: userID,
				EventID: this.state.eventID,
                Title: UserTitle,
				Desc: UserDesc,
				Story: UserStory,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
                    this.props.navigation.navigate('Drawers')
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
		const {params} = this.props.navigation.state;
		const EventID =  params ? params.eventID : null;
		this.setState({eventID: EventID});
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
							onChangeText={(UserTitle) => this.setState({ UserTitle })}
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
							onChangeText={(UserDesc) => this.setState({ UserDesc })}
							ref={(input) => this.descriptionInput = input}
						/>
					</View>

				</View>

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
							onChangeText={(UserStory) => this.setState({ UserStory })}
						/>
					</View>
				</View>
				
				<View style={styles.button}>
					<Button 
						style={buttonColor = '#78B494'} 
						title="Create Post" 
						onPress = {() => this.UserCreatePost()}
					/>
				</View>

			</View>

		);
	}
}



	export default PostCreator;