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
			EventID: 0,
			UserTitle: "",
			UserDesc: "",
			UserStory: "",
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
		const {params} = this.props.navigation.state;
		const EventID =  params ? params.EventID : null;
		this.setState({EventID: EventID});
	}

	UserCreatePost = () => {
		const { userID } 	= this.state;
		const { EventID }   = this.state;
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
				EventID: EventID,
                title: UserTitle,
				desc: UserDesc,
				story: UserStory,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
                    this.props.navigation.navigate('Drawers')
                }
                else {

                    Alert.alert(responseJson.test);
                }

            }).catch((error) => {
                console.error(error);
            });
    }

	render() {

		const {navigate} = this.props.navigation;
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
							onChangeText={(UserStory) => this.setState({ UserStory })}
						/>
					</View>
				</View>
				
				<View style={styles.button}>
					<Button 
						style={buttonColor = '#78B494'} 
						title="Login" 
						onPress = {() => this.UserCreatePost()}
					/>
				</View>

			</View>

		);
	}
}



	export default PostCreator;