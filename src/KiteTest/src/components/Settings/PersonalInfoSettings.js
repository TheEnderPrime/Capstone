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
} from 'react-native';

import Colors from '../../Colors/Colors'

import styles from './styles';

class PersonalInfoSettings extends React.Component {

	constructor(){
		super();       
		this.state = {
			userId: 0,
			firstName: "",
			lastName: "",
			email: "",
			dateOfBirth: "",
			profilePic: '../../images/placeholderProfilePicture.jpg',
			employerName: "",
			aboutMe: "",
			currentCity: "",
			currentStateOrProvence: "",
			currentCountry: "",
			cellPhone: 0,
			homePhone: 0,
			dateAdded: 0,
			numOfPosts: 0,
			numOfFollowers: 0,
			numOfFollowing: 0,
			numOfCommunities: 0,
		   };
		}

  render() {
    return (
    	<View style={styles.container}>
            <View style={styles.settingsBlock}>
				<View style={styles.textInput}>
					<View style={styles.textBox}>
						<Text style={styles.text}>
							What is your First Name?
						</Text>
						<TextInput
							style={styles.textBox}
							placeholder="First Name"
							placeholderTextColor={Colors.kite_greenMediumDark}
							onSubmitEditing={() => this.lastNameInput.focus()}
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(firstName) => this.setState({ firstName })}
						/>
					</View>

					<View style={styles.textBox}>
						<Text style={styles.text}>
							What is your Last Name?
						</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Last Name"
							placeholderTextColor={Colors.kite_greenMediumDark}
							onSubmitEditing={() => this.emailInput.focus()}
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={( lastName) => this.setState({ lastName })}
							ref={(input) => this.lastNameInput = input}
						/>
					</View>

					<View style={styles.textBox}>
						<Text style={styles.text}>
							What is your email?
						</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Tags"
							placeholderTextColor={Colors.kite_greenMediumDark}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(EventTags) => this.setState({ EventTags })}
							ref={(input) => this.tagsInput = input}
						/>
					</View>

					<View style={styles.textBox}>
						<Text style={styles.text}>
							What is your date of birth?
						</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Tags"
							placeholderTextColor={Colors.kite_greenMediumDark}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(EventTags) => this.setState({ EventTags })}
							ref={(input) => this.tagsInput = input}
						/>
					</View>

					{/* <View style={styles.textBox}>
						<Text style={styles.text}>
							Who is your employer?
						</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Tags"
							placeholderTextColor={Colors.kite_greenMediumDark}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(EventTags) => this.setState({ EventTags })}
							ref={(input) => this.tagsInput = input}
						/>
					</View> */}

					{/* <View style={styles.textBox}>
						<Text style={styles.text}>
							Tell us a little about you?
						</Text>
						<TextInput
							style={styles.textBox}
							placeholder="Tags"
							placeholderTextColor={Colors.kite_greenMediumDark}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							onChangeText={(EventTags) => this.setState({ EventTags })}
							ref={(input) => this.tagsInput = input}
						/>
					</View> */}

				</View>
				
				<View style={styles.button}>
					<Button 
						title="Continue"
						onPress = {() => 
							navigate('EventCreator', {	
								EventTitle: this.state.EventTitle, 
								EventDesc: 	this.state.EventDesc,
								EventTags: 	this.state.EventTags
							})
						}
					/>
				</View>
			</View>
        </View>

    );
  }
}



  export default PersonalInfoSettings;