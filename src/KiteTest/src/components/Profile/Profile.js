import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
} from 'react-native';

import styles from './styles';

class Profile extends React.Component {

	static propTypes = {
				//: PropTypes.object.isRequired,
				//: PropTypes.func.isRequired,
		};

		state = {
				//deal: this.props.initialDealData,
				//imageIndex: 0,
		};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.profileDesc}>
					<Text style={styles.profilePicture}>Image</Text>
					<Text style={styles.profileWords}>David Baugh, 21, Sexy, Forbes 30 under 30 material</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<Button style={styles.buttonSelected} 
						onPress={() => {}}
  						title="Posts"
  						color="#841584" />
						  <Button style={styles.buttonSelected} 
						onPress={() => {}}
  						title="Followers"
  						color="#841584" />
						  <Button style={styles.buttonSelected} 
						onPress={() => {}}
  						title="Following"
  						color="#841584" />
						  <Button style={styles.buttonSelected} 
						onPress={() => {}}
  						title="Community"
  						color="#841584" />
				</View>
				
				<View style={styles.postsContainer}>
					<Text style={styles.postsContainer}>Dear Diary, today I programmed. Yup, that's about it.</Text>
				</View>
			</View>

		);
	}
}



	export default Profile;