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
} from 'react-native';

import Colors from '../../Colors/Colors';
import styles from './styles';

class EventCreator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			EventTitle: "",
			EventDesc: "",
			EventTags: "",
			EventStory: "",
		};
	}

	UserCreatePost = (Title, Desc, Tags) => {

        const { finalTitle }	= Title;
		const { finalDesc } 	= Desc;
		const { finalTags } 	= Tags;
		const { finalStory } 	= this.state;


        fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/userLogin.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                title: finalTitle,

				desc: finalDesc,
				
				tags: finalTags,

				story: finalStory,				

            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'Data Matched') {

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
			
			<Text style={styles.titleText}>
				Now, tell your Story! {Title} {Tags} {Desc}
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



	export default EventCreator;