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
  Picker,
  Dimensions,
  ListView,
} from 'react-native';

import Colors from '../../Colors/Colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Input } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: "",
			userID: 0,
			searchType: "user",
		};
	}

	// fetch call for user search data
	searchForUser = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Search.php?f=searchForUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				searchString: this.state.searchString,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
					this.props.navigation.navigate('SearchResults', {data: responseJson, searchType: this.state.searchType})
				}
                else {
					Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
	}

	// fetch call for event search data
	searchForEvent = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Search.php?f=searchForEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				searchString: this.state.searchString,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
					this.props.navigation.navigate('SearchResults', {data: responseJson, searchType: this.state.searchType})

				}
                else {
					Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
	}

	// fetch call for community search data
	searchForCommunity = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Search.php?f=searchForCommunity', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				searchString: this.state.searchString,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
					this.props.navigation.navigate('SearchResults', {data: responseJson, searchType: this.state.searchType})
				}
                else {
                    Alert.alert(responseJson.error);
				}

            }).catch((error) => {
                console.error(error);
            });
	}

	// if statement that decides which search fetch call to run
	doSearch = () => {
		if(this.state.searchType == "user") {
			this.searchForUser();
		} else if(this.state.searchType == "event") {
			this.searchForEvent();
		} else {
			this.searchForCommunity();
		}
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
	}

  	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
				
				<Text style={styles.titleText}>
					Search Kite
				</Text>
				
				<View style={styles.textInput}>
					<View style={styles.textBox}>
						<Text style={styles.text}>
							What is it that you would like to find?
						</Text>
						<Picker
							style={{ height: 50, width: 150, color: '#fff'}}
							selectedValue={this.state.searchType}
							borderRadius={20} 
							borderColor= {"#fff"}
							onValueChange={(itemValue, itemIndex) => this.setState({searchType: itemValue})}>
							<Picker.Item label="User" value="user" />
							<Picker.Item label="Event" value="event" />
							<Picker.Item label="Community" value="community" />
						</Picker>

						<Input inputContainerStyle={{ 
							borderRadius: 40, 
							borderWidth: 1, 
							borderColor: "rgba(110, 120, 170, 1)", 
							height: 50, 
							width: SCREEN_WIDTH - 50, 
							marginVertical: 10 }} 
							leftIcon={
								<SimpleIcon name="user" color="rgba(110, 120, 170, 1)" size={25} />
							} 
							iconContainerStyle={{ marginLeft: 20 }} 
							placeholder="Enter Search" 
							placeholderTextColor="rgba(110, 120, 170, 1)" 
							inputStyle={{ marginLeft: 10, color: "white" }} 
							autoCapitalize="none" 
							autoCorrect={false} 
							keyboardAppearance="light" 
							keyboardType="default" 
							returnKeyType="next" 
							onChangeText={(searchString) => this.setState({searchString: searchString })}
							blurOnSubmit={false} 
						/>
					</View>
				</View>
				
				<View style={styles.button}>
				<Button 
					style={buttonColor = '#78B494'} 
					title="Search Kite"
					onPress = {() => this.doSearch()}
				/>
				</View>
			</View>
		);
	}
}