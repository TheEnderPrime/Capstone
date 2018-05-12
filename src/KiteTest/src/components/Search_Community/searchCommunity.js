import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	StatusBar,
	Alert,
	AsyncStorage,
	ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

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

	setUserIdAsync(state) {
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}


	async componentDidMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({ userID: user });

		this.getIsPartOfCommunity();
	}

	getIsPartOfCommunity = () => {
		for (i = 0; i < 10000; i++) {
			if (this.state.userID != 0) {
				
				fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=getIsPartOfCommunity', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({

						CommunityID: this.props.communityID,

						UserID: this.state.userID,

					})
				}).then((response) => response.json())
					.then((responseJson) => {
						// If server response message same as Data Matched
						if (responseJson.isValid === 'valid') {
							
							if (responseJson.isPart === 'true') {
								this.setState({ selected: true });
							} else {
								this.setState({ selected: false });
							}
						} else {
							Alert.alert("error");
						}
					});
				break;
			}
		}
	}

	joinCommunity = () => {
		for (i = 0; i < 10000; i++) {
			if (this.state.userID != 0) {
				fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=joinCommunity', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({

						CommunityID: this.props.communityID,

						UserID: this.state.userID,

					})
				}).then((response) => response.json())
					.then((responseJson) => {
						// If server response message same as Data Matched
						if (responseJson.isValid === 'valid') {
							if (responseJson.isNowPartOfCommunity === 'true') {
								Alert.alert("Added to Community");
							} else {
								Alert.alert("Removed from Community");
							}
						} else {
							Alert.alert("error");
						}
					});
				break;
			}
		}
	}

	sendJoinRequest(selected) {
		this.joinCommunity();
		this.setState({ selected: !selected });
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
				onPress={() => { this.sendJoinRequest(this.state.selected) }}
			/>
		);
	}
}

var { height, width } = Dimensions.get('window');
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

// Duplicate Community page except for how data is called from database and a follow button is rendered

export default class searchCommunity extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: 0,
			title: "",
			aboutUs: "",
			ProfilePicture: '../../images/placeholderProfilePicture.jpg',
			dateAdded: "",
			numOfThreads: 0,
			numOfPosts: 0,
			numOfMembers: 0,
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
			data: this.data,
			fontLoaded: false,
			timelineToggle: false,
			fontLoaded: false,
		};
	}


	// fetch the events based on a community
	getCommunityTimeLine = (commID) => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getCommunityTimeLine', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({

				CommunityID: commID,

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
					//parse array from responseJson

				}
				else {
					Alert.alert(responseJson.error);
				}

			}).catch((error) => {
				console.error(error);
			});
	}

	// gets community information
	getCommunity = (commID) => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=getCommunity', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({

				CommunityID: commID,

			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					this.setState({ "title": responseJson.community.Title });
					this.setState({ "aboutUs": responseJson.community.AboutUs });
					this.setState({ "ProfilePicture": responseJson.community.ProfilePicture });
					this.setState({ "adminID": responseJson.community.adminID });
				}
				else {
					Alert.alert(responseJson.error);
				}
			}).catch((error) => {
				console.error(error);
			});
	}

	setUserIdAsync(state) {
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}


	// calls getCommunity 
	componentWillMount() {
		this.setState({ fontLoaded: true });
		const { params } = this.props.navigation.state;
		const CommunityID = params ? params.communityID : null;
		this.setState({ communityID: CommunityID });
		this.getCommunity(CommunityID);
	}

	// creates the timeline one event at a time
	eachTweet(x) {
		return (
			
			// <TouchableOpacity 
			// 		  style={{margin: 5, backgroundColor: 'rgb(47,44,60)'}}
			// 		  onPress={() => this.props.navigation.navigate("Event", { eventID: x.id })}
			// 	>
			// 		<RkCard rkType='story' style={{borderRadius:10, borderWidth: 1,  backgroundColor: '#E0E0E0'}}>		
			// 			<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
			// 				<View>
			// 					<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25, textDecorationLine: 'underline'}}>
			// 						{x.Title}
			// 					</RkText>
			// 				</View>
							
			// 				<Image rkCardImg source={{uri: x.ProfilePicture}}  resizeMode="cover"/>
			// 				<View style={{}}>
			// 					<View style={{ flex: 4, flexDirection: 'column', marginLeft: 15, marginTop: 5}}>
									
			// 						<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>
			// 							{"Created: " + x.time}
			// 						</RkText>
			// 						<RkText style={{ textAlign: 'left' }}>
			// 							{x.AboutUs == null || x.AboutUs == "" ? "" : "About us: " + x.AboutUs}
			// 						</RkText>
			// 					</View>
			// 				</View>
			// 			</View>
			// 		</RkCard>
			// 	</TouchableOpacity>
			
			<TouchableOpacity
				style={{ width: width, height: 90, borderBottomWidth: 1, borderColor: '#e3e3e3' }}
				onPress={() => this.props.navigation.navigate("Event", { eventID: x.id })}
			>
				<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					<Image
						source={{ uri: x.ProfilePicture }}
						resizeMode="contain"
						style={{ height: 54, width: 54, borderRadius: 27, margin: 10 }}
					/>
					<View style={{ flex: 1 }}>
						<View style={{ flexDirection: 'row', marginLeft: 5, marginTop: 5, alignItems: 'center' }}>
							<Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{x.FirstName} {x.LastName}</Text>
							<Text style={{ color: '#fff', fontWeight: '500', fontSize: 12 }}> | @ {x.title}</Text>
						</View>
						<View style={{ margin: 5, marginRight: 10, }}>
							<Text style={{ fontSize: 13, color: '#fff', fontWeight: '400' }}>{x.description}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<StatusBar
					barStyle="light-content"
				/>
				{this.state.fontLoaded ?
					<View style={{ flex: 1, backgroundColor: 'rgba(47,44,60,1)' }}>
						<View style={styles.statusBar} />
						<View style={styles.navBar}>
							<Text style={styles.nameHeader}>
								{this.state.title}
							</Text>
						</View>
						<ScrollView style={{ flex: 1 }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.ProfilePicture }}
									style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 10, resizeMode: 'contain' }}
								/>
							</View>
							<View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ flex: 1, fontSize: 26, color: 'white', fontFamily: 'bold' }}>
									{this.state.title}
								</Text>
							</View>

							<View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center' }}>
								<CustomButton title={"Follow"} selected={false} communityID={this.state.communityID}/>
							</View>

							<View style={{ flex: 1, marginTop: 20, width: SCREEN_WIDTH - 80, marginLeft: 40 }}>
								<Text style={{ flex: 1, fontSize: 15, color: 'white', fontFamily: 'regular' }}>
									{this.state.aboutUs}
								</Text>
							</View>
							
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