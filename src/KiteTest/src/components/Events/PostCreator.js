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
			userId: 0,
			EventTitle: "",
			EventDesc: "",
			EventTags: "",
			EventStory: "",
		};
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userId: user});
		if(this.state.userId != null){
			this.GatherUserInformation(this.state.userId);
		}
	}

	UserCreatePost = (Title, Desc, Tags) => {
		const { userId } 		= this.state;
        const { finalTitle }	= Title;
		const { finalDesc } 	= Desc;
		const { finalTags } 	= Tags;
		const { finalStory } 	= this.state;


		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Event.php?f=createEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: userID,

                title: finalTitle,

				desc: finalDesc,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'Data Matched') {
					// setState eventID
					//navigate eventID, title, desc
                    this.props.navigation.navigate('Drawers')
                }
                else {

                    Alert.alert(responseJson);
                }

            }).catch((error) => {
                console.error(error);
            });
    }

	render() {

		const {params} = this.props.navigation.state;
		const Title = params ? params.EventTitle : null
		const Tags =  params ? params.EventTags : null;
		const Desc =  params ? params.EventDesc : null;

		return (
			<View style={styles.container}>
			
				<Text></Text>

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
							onChangeText={(EventStory) => this.setState({ EventStory })}
						/>
					</View>
				</View>
				
				<View style={styles.button}>
					<Button 
						style={buttonColor = '#78B494'} 
						title="Login" 
						onPress = {() => this.UserCreatePost(Title, Desc, Tags)}
					/>
				</View>

			</View>

		);
	}
}



	export default PostCreator;