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

import Timeline from 'react-native-timeline-listview'

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
			userAge: 21,
			gender: "Sexy",
			achievement: "Forbes 30 under 30",
			profilePic: '../../images/placeholderProfilePicture.jpg',
			numOfPosts: 0,
			numOfFollowers: 0,
			numOfFollowing: 0,
			numOfCommunities: 0,
	};
	
	constructor(){
		super()
		this.data = [
			{time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
		    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
		    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
		    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
		    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
		]
	}

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
				
				<View style={styles.timelineContainer}>
					<Timeline
						style={styles.timelineList}
						data={this.data}
						circleSize={20}
						circleColor='rgb(45,156,219)'
						lineColor='rgb(45,156,219)'
						timeContainerStyle={{minWidth:52, marginTop: -5}}
						timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
						descriptionStyle={{color:'gray'}}
						timeContainerStyle={{minWidth:72}}
						circleSize={-100}
					/>
				</View>

			</View>

		);
	}
}



	export default Profile;