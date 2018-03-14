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
	AsyncStorage,
} from 'react-native';

import Timeline from 'react-native-timeline-listview'

import styles from './styles';

class Profile extends React.Component {

	constructor(){
		super();   
		this.onEventPress = this.onEventPress.bind(this)
		this.renderSelected = this.renderSelected.bind(this)
		this.data = [
			{time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
		    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
		    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
		    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
		    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
		]
		this.state = {
			userId: 0,
			firstName: "",
			lastName: "",
			email: "",
			dateOfBirth: "",
			achievement: "",
			profilePic: '../../images/placeholderProfilePicture.jpg',
			employerName: "",
			aboutMe: "",
			currentCity: "",
			currentStateOrProvence: "",
			currentCountr: "",
			cellPhone: 0,
			homePhone: 0,
			dateAdded: 0,
			numOfPosts: 0,
			numOfFollowers: 0,
			numOfFollowing: 0,
			numOfCommunities: 0,
			selected: null,
       	};

	}

	onRefresh(){
		//set initial data
	}
	
	onEndReached() {
		//fetch next data
	}
	
	renderFooter() {
		//show loading indicator
		if (this.state.waiting) {
				return <ActivityIndicator />;
		} else {
				return <Text>~</Text>;
		}
	}

	onEventPress(data){
		this.setState({selected: data})
		if(this.state.selected) this.props.navigation.navigate("Event", {EventTitle: this.state.selected.title, EventDesc: this.state.selected.description})
  	}

  	renderSelected(){
		if(this.state.selected)
	  	return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userId: user});
		if(this.state.userId != null){
			this.GatherUserInformation(this.state.userId);
		}
	}

	 GatherUserInformation = () => {
		const {userId} = this.state;
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getProfile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				UserID: userId,
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					this.setState({"firstName": responseJson.firstName});
					this.setState({"lastName": responseJson.lastName});
					this.setState({"email": responseJson.email});
					this.setState({"dateOfBirth": responseJson.dateOfBirth});
					this.setState({"employerName": responseJson.employerName});
					this.setState({"aboutMe": responseJson.aboutMe});
					this.setState({"currentCity": responseJson.currentCity});
					this.setState({"currentStateOrProvence": responseJson.currentStateOrProvence});
					this.setState({"currentCountry": responseJson.currentCountry});
					this.setState({"cellPhone": responseJson.cellPhone});
					this.setState({"homePhone": responseJson.homePhone});
					this.setState({"dateAdded": responseJson.dateAdded});
			}
				else {
					Alert.alert(responseJson);
				}
			}).catch((error) => {
				console.error(error);
			});
	}

	// UpdateUserInformation = () =>{
		// fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getProfile', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json',w
		// 	},
		// 	body: JSON.stringify({
		// 		UserID: this.state.userid,
			// 		firstName: "David",
			// lastName: "Baugh",
			// userid: null,
			// gender: "Sexy",
			// achievement: "Forbes 30 under 30",
			// profilePic: '../../images/placeholderProfilePicture.jpg',
			// numOfPosts: 0,
			// numOfFollowers: 0,
			// numOfFollowing: 0,
			// numOfCommunities: 0,
		// 	})
	// }
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.profileDesc}>
					<Image
						style={styles.profilePicture}
          				source={require('../../images/placeholderProfilePicture.jpg')}
					/>
					<View style={styles.profileText}>
						<Text style={styles.text}>{this.state.firstName} {this.state.lastName}</Text>
					
						<Text style={styles.text}>{this.state.email}</Text>
						<Text style={styles.text}>{this.state.employerName}</Text>
						<Text style={styles.text}>{this.state.aboutMe}</Text>
						<Text style={styles.text}>{this.state.currentCity} {this.state.currentStateOrProvence} {this.state.currentCountry}</Text>
						<Text style={styles.text}>{this.state.cellPhone}</Text>
						<Text style={styles.text}>{this.state.homePhone}</Text>
						<Text style={styles.text}>{this.state.dateAdded}</Text>
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
					{/* {this.renderSelected()} */}
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
						showTime={false}
						onEventPress={this.onEventPress}
					/>
				</View>

			</View>

		);
	}
}
export default Profile;