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
} from 'react-native';

import Colors from '../../Colors/Colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Input } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: "",
			userID: 0,
			searchType: "",
		};
	}

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

					this.setState({ isRefreshing: true });
					this.setState({
						data: responseJson.timeline,
						dataSource: ds.cloneWithRows(responseJson.timeline),
						isRefreshing: false
					});
				
				}
                else {
                    Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
	}

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

					this.setState({ isRefreshing: true });
					this.setState({
						data: responseJson.timeline,
						dataSource: ds.cloneWithRows(responseJson.timeline),
						isRefreshing: false
					});
				
				}
                else {
                    Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
	}

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

					this.setState({ isRefreshing: true });
					this.setState({
						data: responseJson.timeline,
						dataSource: ds.cloneWithRows(responseJson.timeline),
						isRefreshing: false
					});
				
				}
                else {
                    Alert.alert(responseJson.error);
                }

            }).catch((error) => {
                console.error(error);
            });
	}

	doSearch = () => {
		// if(this.state.searchType == "user") {
		// 	this.searchForUser();
		// } else if(this.state.searchType == "event") {
		// 	this.searchForEvent();
		// } else {
		// 	this.searchForCommunity();
		// }
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
							selectedValue={this.state.searchType}
							onValueChange={(itemValue, itemIndex) => this.setState({searchType: itemValue})}>
							<Picker.Item label="User" value="user" />
							<Picker.Item label="Event" value="event" />
							<Picker.Item label="Community" value="community" />
						</Picker>
						<TextInput
							style={styles.textBox}
							placeholder="Enter Search"
							placeholderTextColor={'#fff'}
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(searchString) => this.setState({ searchString })}
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



  export default Search;