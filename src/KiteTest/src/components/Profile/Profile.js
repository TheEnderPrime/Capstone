import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Image,
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
				userName: "David Baugh",
				userAge: 12,
				gender: "Sexy",
				achievement: "Forbes 30 under 30",
				profilePic: '../../images/placeholderProfilePicture.jpg',
				numOfPosts: 0,
				numOfFollowers: 0,
				numOfFollowing: 0,
				numOfCommunities: 0,
		};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.profileDesc}>
					<Image
						style={styles.profilePicture}
          				source={require('../../images/placeholderProfilePicture.jpg')}
					/>
					<View style={styles.profileText}>
						<Text style={styles.text}>{this.state.userName}</Text>
						<Text style={styles.text}>{this.state.userAge}</Text>
						<Text style={styles.text}>{this.state.gender}</Text>
						<Text style={styles.text}>{this.state.achievement}</Text>
					</View>
				</View>

				<View style={styles.statBoxesContainer}>
					
					<View style={styles.statBox}>
						<Text style={styles.statNumberCount}>{this.state.numOfPosts}</Text>
						<Text style={styles.statCountTitles}>Posts</Text>
					</View>

					<View style={styles.statBox}>
						<Text style={styles.statNumberCount}>{this.state.numOfFollowers}</Text>
						<Text style={styles.statCountTitles}>Followers</Text>
					</View>

					<View style={styles.statBox}>
						<Text style={styles.statNumberCount}>{this.state.numOfFollowing}</Text>
						<Text style={styles.statCountTitles}>Following</Text>
					</View>

					<View style={styles.statBox}>
						<Text style={styles.statNumberCount}>{this.state.numOfCommunities}</Text>
						<Text style={styles.statCountTitles}>Community</Text>
					</View>					

				</View>
				
				<View style={styles.postsContainer}>
					<Text style={styles.postsContainer}>Dear Diary, today I programmed. Yup, that's about it.</Text>
				</View>

			</View>

		);
	}
}



	export default Profile;