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
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Colors/Colors'
import { RkButton } from 'react-native-ui-kitten';
import { RkTheme } from 'react-native-ui-kitten';
import { RkCard } from 'react-native-ui-kitten';
import { RkText } from 'react-native-ui-kitten';

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
				//Alert.alert("number one: " + this.props.communityID + " also " + this.state.userID);
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
							//Alert.alert("responseJson.isPart: " + responseJson.isPart)
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

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Community extends Component {
  	constructor(props) {
    	super(props);

    	this.state = {
			title: "",
			aboutUs: "",
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
	
	// returns the timeline of events based on the communityID
	getCommunityTimeLine = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getCommunityEventsTimeLine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				CommunityID: this.state.communityID,
				
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
		
	// returns all the information about the community
	getCommunity = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=getCommunity', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				CommunityID: this.state.communityID,
				
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					this.setState({"title": responseJson.community.Title});
					this.setState({"aboutUs": responseJson.community.AboutUs});
					this.setState({"ProfilePicture": responseJson.community.ProfilePicture});
					this.setState({"adminID": responseJson.community.adminID});
				}
				else {
					Alert.alert(responseJson.error);
				}
			}).catch((error) => {
				console.error(error);
			});
	}
	
	// sets the userID
	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}
		
	// runs before render. Sets the userId and commID. Runs getComm()
  	async componentWillMount() {
		this.setState({ fontLoaded: true });
		const user = await AsyncStorage.getItem('userID')
		const {params} = this.props.navigation.state;
		const CommunityID =  params ? params.communityID : null;
		this.setState({communityID: CommunityID});
		this.getCommunity();
		this.getCommunityTimeLine();
	}

	eachTweet(x){
		return(
			<TouchableOpacity
				style={{ paddingLeft: 5, paddingRight: 5 }}
				onPress={() => this.props.navigation.navigate("Event", { eventID: x.id })}
			>
				<RkCard rkType='story' style={{ marginTop:10, paddingTop:0, paddingBottom:8,
    								backgroundColor: '#E0E0E0', borderRadius:10, borderWidth: 1 }}>		
					<View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius:10, 
								paddingTop:7, borderTopWidth: 1, backgroundColor: Colors.kite_greenMediumDark}}>
						<Image  source={{uri: x.ProfilePicture}} resizeMode="contain"
							style={{ width:80, height: 70, alignSelf: 'flex-start'}}/>
						<View style={{ flex: 1, flexDirection: 'row', marginTop: 5}}>
							<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 25 }}>{x.FirstName} {x.LastName}</RkText>
							<RkText rkType='header' style={{ textAlign: 'left', marginTop: 5, marginRight: 5, fontWeight: 'bold', fontSize: 12 }}>{x.time}</RkText>
						</View>
					</View>
					<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
						<Image rkCardImg source={{uri: x.postPicture == null ? null : x.postPicture}} resizeMode="cover"/>
						<View style={{backgroundColor: '#E0E0E0'}}>
							<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25,  marginLeft: 10, textDecorationLine: 'underline'}}>
									{x.title}
							</RkText>
							<RkText style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 0, alignSelf: 'flex-start' }}>
									{x.description}
							</RkText>
						</View>
					</View>
				</RkCard>
			</TouchableOpacity>
		)
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
									{this.state.title}
								</Text>
							</View>
						<ScrollView style={{flex: 1}}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Image
							source={{ uri: this.state.ProfilePicture }}
							style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 10, resizeMode: 'contain'}}
							/>
						</View>
						<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={{flex: 1, fontSize: 26, color: 'white', fontFamily: 'bold'}}>
							{this.state.title}
							</Text>
						</View>

						<View style={{flex:1, flexDirection: 'row', marginTop: 20,  marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
							<CustomButton title={"Follow"} selected={false} communityID={this.state.communityID}/>
						</View>

						<View style={{flex: 1, marginTop: 20, width: SCREEN_WIDTH - 80, marginLeft: 40}}>
							<Text style={{flex: 1, fontSize: 15, color: 'white', fontFamily: 'regular'}}>
							{this.state.aboutUs}
							</Text>
						</View>
	
						<Button
							containerStyle={{ marginVertical: 20 }}
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
							buttonStyle={{ height: 55, width: SCREEN_WIDTH - 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
							title="Expand Timeline"
							titleStyle={{ fontFamily: 'regular', fontSize: 20, color: 'white', textAlign: 'center' }}
							onPress={() => this.setState({timelineToggle: this.state.timelineToggle ? (false) : (true)})}
							activeOpacity={0.5}
						/>
						{ this.state.timelineToggle 
							? (
								<View style={styles.container}>
									<Button
										title="Create Event"
										onPress={() => this.props.navigation.navigate('EventCreator', {communityID: this.state.communityID})}
									/>
									<ListView 
										enableEmptySections={true}
										dataSource = {this.state.dataSource}
										renderRow = {(rowData) => this.eachTweet(rowData)}
									/>
								</View>
							) : 
							( 
								null
							)
						}
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