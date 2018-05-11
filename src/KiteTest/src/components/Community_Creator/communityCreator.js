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

export default class communityCreator extends React.Component {

	constructor(props) {
		super(props);
        
        this.state = {

		};
	}

	// sends the necessary information to create a community to the database
	createCommunity = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=createCommunity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                Title: this.state.title,

                AboutUs: this.state.aboutUs,
                
                AdminID: this.state.userID,
				
            })
        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as valid
                if (responseJson.isValid === 'valid') {
					
					const communityID = responseJson.CommunityID;

					this.props.navigation.navigate('Community', {communityID})
					
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

	// sets the userID before render happens
	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
	}

  	render() {
		const {navigate} = this.props.navigation;
		return (

			<View style={styles.container}>
				
			<View style={styles.titleView}>
				<Text style={styles.Title}>
					
				</Text>
			</View>
				
			<View style={styles.textBox}>
				<Text style={styles.text}>
					Community Title
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
					placeholder="Community Title" 
					placeholderTextColor="rgba(110, 120, 170, 1)" 
					inputStyle={{ marginLeft: 10, color: "white" }} 
					autoCapitalize="none" 
					autoCorrect={false} 
					keyboardAppearance="light" 
					keyboardType="default" 
					returnKeyType="next" 
					ref={input => (this.usernameInput = input)} 
					onSubmitEditing={() => this.descriptionInput.focus()} 
					onChangeText={(title) => this.setState({ title })}
					blurOnSubmit={false} 
				/>
			</View>
				
			<View style={styles.textBox}>
				<Text style={styles.text}>
					Community Description Here
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
					placeholder="Community Description" 
					placeholderTextColor="rgba(110, 120, 170, 1)" 
					inputStyle={{ marginLeft: 10, color: "white" }} 
					autoCapitalize="none" 
					autoCorrect={false} 
					keyboardAppearance="light" 
					keyboardType="default" 
					returnKeyType="next" 
					ref={input => (this.usernameInput = input)} 
					onSubmitEditing={() => this.descriptionInput.focus()} 
					onChangeText={(aboutUs) => this.setState({ aboutUs })}
					ref={(input) => this.descriptionInput = input}
					blurOnSubmit={false} 
				/>
			</View>
			
			<View style={styles.button}>
				<Button 
					style={buttonColor = "#78B494"} 
					title="Create Community" 
					onPress = {() => this.createCommunity()}
				/>
			</View>
			</View>
		);
	}
}