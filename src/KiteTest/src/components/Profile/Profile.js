import React, { Component } from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  StatusBar,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

//Custom Button
class CustomButton extends Component {
  	constructor() {
    	super();

	    this.state = {
			selected: false
    	};
	}

	componentDidMount() {
    	const { selected } = this.props;

    	this.setState({
      		selected
    	});
  	}

	render() {
		const { title } = this.props;
		const { selected } = this.state;

		return (
			<Button
				title={title}
				titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
				buttonStyle={selected ? { backgroundColor: 'rgba(213, 100, 140, 1)', borderRadius: 100, width: 127 } : { borderWidth: 1, borderColor: 'white', borderRadius: 30, width: 127, backgroundColor: 'transparent' }}
				containerStyle={{ marginRight: 10 }}
				onPress={() => this.setState({ selected: !selected })}
			/>
		);
	}
}

export default class Profile extends Component {
  	constructor(props) {
    	super(props);

    	this.state = {
			firstName: "",
			lastName: "",
			email: "",
			dateOfBirth: "",
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
			userID: 0,
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data,
      		fontLoaded: false,
    	};
	}
	  
	loadTimeline = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getUserTimeLine', {
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
						
				UserID: this.state.userID,
						
		    })
		}).then((response) => response.json())
		    .then((responseJson) => {
		
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
			
					this.setState({
					data: responseJson.timeline,
					isRefreshing: false
					})
					//parse array from responseJson
							
				}
				else {
					Alert.alert("responseJson.error");
				}
		
		    }).catch((error) => {
		        console.error(error);
		    });
	}
		
	GatherUserInformation = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getProfile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				UserID: this.state.userID,
		
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
		
	onRefresh(){
		//set initial data
		this.setState({isRefreshing: true});
		//refresh to initial data
		setTimeout(() => {
			//refresh to initial data
			
			this.loadTimeline();
		}, 2000);
	}
			
	onEndReached() {
		//fetch next data
		if (!this.state.waiting) {
			this.setState({waiting: true});
		
			//fetch and concat data
			setTimeout(() => {
			
			//refresh to initial data
			var data = this.state.data.concat(
				[
				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'}
				]
			)
			
			  this.setState({
				waiting: false,
				data: data,
			  });
			}, 2000);
		}
	}
	
	renderFooter() {
		if (this.waiting) {
			return <ActivityIndicator />;
		} else {
			return <Text>~</Text>;
		}
	}
		
	onEventPress(data){
		this.setState({selected: data})
		if(this.state.selected) {
			this.props.navigation.navigate("Event", {eventID: this.state.selected.id})
		}
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
		
  	async componentDidMount() {
		this.setState({ fontLoaded: true });
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		if(this.state.userID != null){
			this.GatherUserInformation(this.state.userID);
		}
		// this.loadTimeline();
  	}

  	render() {
    	return (
      		<View style={{flex: 1}}>
				<StatusBar
				barStyle="light-content"
				/>
				{ this.state.fontLoaded ?
					<View style={{flex: 1, backgroundColor: 'rgba(47,44,60,1)'}}>
						<View style={styles.statusBar} />
							<View style={styles.navBar}>
								<Text style={styles.nameHeader}>
									{this.state.firstName}, 26
								</Text>
							</View>
						<ScrollView style={{flex: 1}}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Image
							source={{ uri: 'https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg' }}
							style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 10}}
							/>
						</View>
						<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={{flex: 1, fontSize: 26, color: 'white', fontFamily: 'bold'}}>
							{this.state.firstName}
							</Text>
						</View>

						<View style={{flex:1, flexDirection: 'row', marginTop: 20,  marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
							<CustomButton title={"Follow"} selected={false} />
						</View>

						<View style={{flex: 1, marginTop: 20, width: SCREEN_WIDTH - 80, marginLeft: 40}}>
							<Text style={{flex: 1, fontSize: 15, color: 'white', fontFamily: 'regular'}}>
							{this.state.aboutMe} "I like long walks on the beach with beautiful people that like long walks on the beach with beautiful people."
							</Text>
						</View>
						<View style={{flex: 1, marginTop: 30}}>
							<Text style={{flex: 1, fontSize: 15, color: 'rgba(216, 121, 112, 1)', fontFamily: 'regular', marginLeft: 40}}>
							FOLLOWERS
							</Text>
							<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 30}}>
								<View style={{flex: 1, flexDirection: 'row'}}>
									<View style={{}}>
									<Text style={styles.infoTypeLabel}>Followers</Text>
									<Text style={styles.infoTypeLabel}>Following</Text>
									<Text style={styles.infoTypeLabel}>Communities</Text>
									
									</View>
									<View style={{marginLeft: 10}}>
									<Text style={styles.infoAnswerLabel}>{this.state.numOfFollowers}</Text>
									<Text style={styles.infoAnswerLabel}>{this.state.numOfFollowing}</Text>
									<Text style={styles.infoAnswerLabel}>{this.state.numOfCommunities}</Text>
									
									</View>
								</View>
							</View>
						</View>
						<View style={{flex: 1, marginTop: 30}}>
							<Text style={{flex: 1, fontSize: 15, color: 'rgba(216, 121, 112, 1)', fontFamily: 'regular', marginLeft: 40}}>
							COMMUNITIES
							</Text>
							<View style={{flex: 1, width: SCREEN_WIDTH, marginTop: 20}}>
							<ScrollView
								style={{flex: 1}}
								horizontal
								showsHorizontalScrollIndicator={false}
							>
								<View style={{flex: 1, flexDirection: 'column', height: 170, marginLeft: 40, marginRight: 10}}>
								<View style={{flex: 1, flexDirection: 'row'}}>
									<CustomButton title={this.state.firstName} selected={true} />
									<CustomButton title="Sport" />
									<CustomButton title="Swimming" selected={true} />
									<CustomButton title="Religion" />
								</View>
								<View style={{flex: 1, flexDirection: 'row' }}>
									<CustomButton title="Music" />
									<CustomButton title="Soccer" selected={true} />
									<CustomButton title="Radiohead" selected={true} />
									<CustomButton title="Micheal Jackson" />
								</View>
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<CustomButton title="Travelling" selected={true} />
									<CustomButton title="Rock'n'Roll" />
									<CustomButton title="Dogs" selected={true} />
									<CustomButton title="France" selected={true} />
								</View>
								</View>
							</ScrollView>
							</View>
						</View>
						<View style={{flex: 1, marginTop: 30}}>
							<Text style={{flex: 1, fontSize: 15, color: 'rgba(216, 121, 112, 1)', fontFamily: 'regular', marginLeft: 40}}>
							INFO
							</Text>
							<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 30}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
								<Text style={styles.infoTypeLabel}>Age</Text>
								<Text style={styles.infoTypeLabel}>Height</Text>
								<Text style={styles.infoTypeLabel}>Ethnicity</Text>
								<Text style={styles.infoTypeLabel}>Sign</Text>
								<Text style={styles.infoTypeLabel}>Religion</Text>
								</View>
								<View style={{flex: 1, marginLeft: 10}}>
								<Text style={styles.infoAnswerLabel}>26</Text>
								<Text style={styles.infoAnswerLabel}>5'4"</Text>
								<Text style={styles.infoAnswerLabel}>White</Text>
								<Text style={styles.infoAnswerLabel}>Pisces</Text>
								<Text style={styles.infoAnswerLabel}>Catholic</Text>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
								<Text style={styles.infoTypeLabel}>Body Type</Text>
								<Text style={styles.infoTypeLabel}>Diet</Text>
								<Text style={styles.infoTypeLabel}>Smoke</Text>
								<Text style={styles.infoTypeLabel}>Drink</Text>
								<Text style={styles.infoTypeLabel}>Drugs</Text>
								</View>
								<View style={{flex: 1, marginLeft: 10, marginRight: -20}}>
								<Text style={styles.infoAnswerLabel}>Fit</Text>
								<Text style={styles.infoAnswerLabel}>Vegan</Text>
								<Text style={styles.infoAnswerLabel}>No</Text>
								<Text style={styles.infoAnswerLabel}>No</Text>
								<Text style={styles.infoAnswerLabel}>Never</Text>
								</View>
							</View>
							</View>
						</View>
						<Button
							containerStyle={{ marginVertical: 20 }}
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
							buttonStyle={{ height: 55, width: SCREEN_WIDTH - 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
							// linearGradientProps = {{
							//   colors: ['rgba(214,116,112,1)', 'rgba(233,174,87,1)'],
							//   start: [1, 0],
							//   end: [0.2, 0]
							// }}
							title="Expand Timeline"
							titleStyle={{ fontFamily: 'regular', fontSize: 20, color: 'white', textAlign: 'center' }}
							onPress={() => console.log('Message Theresa')}
							activeOpacity={0.5}
						/>
						</ScrollView>
					</View> :
					<Text>Loading...</Text>
				}
			</View>
    	);
  	}
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center'
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 10,
  }
});



// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import {
// 	Platform,
// 	StyleSheet,
// 	Text,
// 	View,
// 	Button,
// 	TouchableOpacity,
// 	Image,
// 	AsyncStorage,
// 	Alert,
// 	RefreshControl,
// 	ActivityIndicator
// } from 'react-native';

// import Timeline from 'react-native-timeline-listview'

// import styles from './styles';

// class Profile extends React.Component {

// 	constructor(){
// 		super();   

// 		this.onEndReached 	= this.onEndReached.bind(this)
// 		this.renderSelected = this.renderSelected.bind(this)
// 		this.onRefresh 		= this.onRefresh.bind(this)
// 		this.onEventPress 	= this.onEventPress.bind(this)

// 		this.data = []
		
// 		this.state = {
			// firstName: "",
			// lastName: "",
			// email: "",
			// dateOfBirth: "",
			// profilePic: '../../images/placeholderProfilePicture.jpg',
			// employerName: "",
			// aboutMe: "",
			// currentCity: "",
			// currentStateOrProvence: "",
			// currentCountry: "",
			// cellPhone: 0,
			// homePhone: 0,
			// dateAdded: 0,
			// numOfPosts: 0,
			// numOfFollowers: 0,
			// numOfFollowing: 0,
			// numOfCommunities: 0,
			// userID: 0,
			// isRefreshing: false,
			// waiting: false,
			// selected: null,
			// data: this.data,
			
//        	}

// 	}

// 	loadTimeline = () => {

// 		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getUserTimeLine', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
				
// 				UserID: this.state.userID,
				
//             })

//         }).then((response) => response.json())
//             .then((responseJson) => {

//                 // If server response message same as Data Matched
//                 if (responseJson.isValid === 'valid') {

// 					this.setState({
// 						data: responseJson.timeline,
// 						isRefreshing: false
// 					})
// 					//parse array from responseJson
				
// 				}
//                 else {
//                     Alert.alert("responseJson.error");
//                 }

//             }).catch((error) => {
//                 console.error(error);
//             });
// 	}

// 	GatherUserInformation = () => {
// 		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getProfile', {
// 			method: 'POST',
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({

// 				UserID: this.state.userID,

// 			})
// 		}).then((response) => response.json())
// 			.then((responseJson) => {
// 				// If server response message same as Data Matched
// 				if (responseJson.isValid === 'valid') {
// 					this.setState({"firstName": responseJson.firstName});
// 					this.setState({"lastName": responseJson.lastName});
// 					this.setState({"email": responseJson.email});
// 					this.setState({"dateOfBirth": responseJson.dateOfBirth});
// 					this.setState({"employerName": responseJson.employerName});
// 					this.setState({"aboutMe": responseJson.aboutMe});
// 					this.setState({"currentCity": responseJson.currentCity});
// 					this.setState({"currentStateOrProvence": responseJson.currentStateOrProvence});
// 					this.setState({"currentCountry": responseJson.currentCountry});
// 					this.setState({"cellPhone": responseJson.cellPhone});
// 					this.setState({"homePhone": responseJson.homePhone});
// 					this.setState({"dateAdded": responseJson.dateAdded});
// 			}
// 				else {
// 					Alert.alert(responseJson);
// 				}
// 			}).catch((error) => {
// 				console.error(error);
// 			});
// 	}

// 	onRefresh(){
// 		//set initial data
// 		this.setState({isRefreshing: true});
// 		//refresh to initial data
// 		setTimeout(() => {
// 			//refresh to initial data
			
// 			this.loadTimeline();

// 		}, 2000);
// 	}
	
// 	onEndReached() {
// 		//fetch next data
// 		if (!this.state.waiting) {
// 			this.setState({waiting: true});
	
// 			//fetch and concat data
// 			setTimeout(() => {
	
// 			//refresh to initial data
// 			var data = this.state.data.concat(
// 				[
// 				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
// 				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
// 				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
// 				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
// 				  	{time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'}
// 				]
// 			)
	
// 			  this.setState({
// 				waiting: false,
// 				data: data,
// 			  });
// 			}, 2000);
// 		}
// 	}
	
// 	renderFooter() {
// 		if (this.waiting) {
// 			return <ActivityIndicator />;
// 		} else {
// 			return <Text>~</Text>;
// 		}
// 	}

// 	onEventPress(data){
// 		this.setState({selected: data})
// 		if(this.state.selected) {
// 			this.props.navigation.navigate("Event", {eventID: this.state.selected.id})
// 		}
//   	}

//   	renderSelected(){
// 		if(this.state.selected)
// 	  	return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
// 	}

// 	setUserIdAsync(state){
// 		return new Promise((resolved) => {
// 			this.setState(state, resolved)
// 		});
// 	}

// 	async componentDidMount(){
// 		const user = await AsyncStorage.getItem('userID')
// 		await this.setUserIdAsync({userID: user});
// 		if(this.state.userID != null){
// 			this.GatherUserInformation(this.state.userID);
// 		}
// 		this.loadTimeline();
// 	}

// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<View style={styles.profileDesc}>
// 					<Image
// 						style={styles.profilePicture}
//           				source={require('../../images/placeholderProfilePicture.jpg')}
// 					/>
// 					<View style={styles.profileText}>
// 						<Text style={styles.text}>{this.state.firstName} {this.state.lastName}</Text>
					
// 						<Text style={styles.text}>{this.state.email}</Text>
// 						<Text style={styles.text}>{this.state.employerName}</Text>
// 						<Text style={styles.text}>{this.state.aboutMe}</Text>
// 						<Text style={styles.text}>{this.state.currentCity} {this.state.currentStateOrProvence} {this.state.currentCountry}</Text>
// 						<Text style={styles.text}>{this.state.cellPhone}</Text>
// 						<Text style={styles.text}>{this.state.homePhone}</Text>
// 						<Text style={styles.text}>{this.state.dateAdded}</Text>
// 					</View>
// 				</View>

// 				<View style={styles.statBoxesContainer}>
					
// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfPosts}</Text>
// 						<Text style={styles.statCountTitles}>Posts</Text>
// 					</View>

// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfFollowers}</Text>
// 						<Text style={styles.statCountTitles}>Followers</Text>
// 					</View>

// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfFollowing}</Text>
// 						<Text style={styles.statCountTitles}>Following</Text>
// 					</View>

// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfCommunities}</Text>
// 						<Text style={styles.statCountTitles}>Community</Text>
// 					</View>					

// 				</View>
				
// 				<View style={styles.timelineContainer}>
// 					{/* {this.renderSelected()} */}
// 					<Timeline
// 						style={styles.timelineList}
// 						data={this.state.data}
// 						circleSize={20}
// 						circleColor='rgb(45,156,219)'
// 						lineColor='rgb(45,156,219)'
// 						timeContainerStyle={{minWidth:52, marginTop: -5}}
// 						timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
// 						descriptionStyle={{color:'gray'}}
// 						timeContainerStyle={{minWidth:72}}
// 						circleSize={-100}
// 						showTime={false}
// 						onEventPress={this.onEventPress}
// 						options={{
// 							refreshControl: (
// 								<RefreshControl
// 									refreshing={this.state.isRefreshing} 
// 									onRefresh={this.onRefresh}							
// 								/>
// 							),
// 							//renderFooter: this.renderFooter,
// 							//onEndReached: this.onEndReached,
// 						}}
// 					/>
// 				</View>

// 			</View>

// 		);
// 	}
// }
// export default Profile;