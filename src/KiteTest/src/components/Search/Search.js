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
} from 'react-native';

import Colors from '../../Colors/Colors';
import styles from './styles';
import Timeline from 'react-native-timeline-listview';

class Search extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: "Nothing",
			userID: 0,
			searchType: "No Type",
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
	}

	doSearch = () => {


		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Search.php?f=doSearch', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: this.userID,

				SearchType: this.searchType,

                SearchString: this.searchString,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
					
				   Alert.alert(responseJson);
				   
				   	if(SearchType == "user") {
					   <TouchableOpacity>{responseJson.results}</TouchableOpacity>
				   	} else if (SearchType == "event") {
						<Timeline
							style={styles.timelineList}
							data={this.state.data}
							circleSize={20}
							circleColor='rgb(45,156,219)'
							lineColor='rgb(45,156,219)'
							timeContainerStyle={{minWidth:52, marginTop: -5}}
							timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
							descriptionStyle={{color:'gray'}}
							timeContainerStyle={{minWidth:72}}
							circleSize={-100}
							showTime={false}
							onEventPress={this.onEventPress}
						/>
                	} else {
						Alert.alert("Wrong! Results did not compute!");
					}
				} else {
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
						placeholderTextColor={Colors.kite_greenMediumDark}
						onSubmitEditing={() => this.descriptionInput.focus()}
						autoCapitalize="none"
						autoCorrect={false}
						onChangeText={(EventTitle) => this.setState({ EventTitle })}
					/>
				</View>
				
				
				
			</View>
			
			<View style={styles.button}>
			<Button 
				style={buttonColor = '#78B494'} 
				title="Search Kite" 
				onPress = {this.doSearch}
					/>
			</View>
    	</View>

    );
  }
}



  export default Search;