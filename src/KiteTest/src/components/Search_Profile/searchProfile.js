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
			
		};
	}

	getIsFollowing = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getIsFollowing', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				me: this.state.yourUserID,

				tryToFollow: this.state.userID,
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					
					if(responseJson.isFollowing == "true") {
						this.setState({selected : true});
					} else {
						this.setState({selected : false});
					}
				} else {
					Alert.alert(responseJson);
				}
			}).catch((error) => {
				console.error(error);
			});
	}

	addFollower = () => {
		Alert.alert("addFollower: " + this.state.yourUserID + " : " + this.props.userID);
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=addFollower', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				me: this.state.yourUserID,

				tryToFollow: this.props.userID,
		
			})
		});
	}

	removeFollower = () => {
		Alert.alert("removeFollower: " + this.state.yourUserID + " : " + this.props.userID);
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=removeFollower', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				me: this.state.yourUserID,

				tryToRemoveFollow: this.state.userID,
		
			})
		});
	}
	
	sendFollowRequest({selected}) {
		if(!selected) {
			this.addFollower();
		} else {
			this.removeFollower();
		}
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({yourUserID: user});

    	this.getIsFollowing();
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
				onPress={() => {this.setState({selected: !selected }), this.sendFollowRequest(this.state.selected)}}
			/>
		);
	}
}

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class searchProfile extends Component {
  	constructor(props) {
    	super(props);

    	this.state = {
			firstName: "",
			lastName: "",
			email: "",
			dateOfBirth: 0,
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
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
			data: this.data,
			fontLoaded: false,
			timelineToggle: false,
    	};
	}
	  
	loadTimeline = (id) => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getUserTimeLine', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				UserID: id,
				
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
		
	GatherUserInformation = (id) => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getProfile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				UserID: id,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					this.setState({"ProfilePicture": responseJson.profilePicture});
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
		
  	async componentWillMount() {
		this.setState({ fontLoaded: true });
		const { params } = this.props.navigation.state;
		const USERID = params.userID ? params.userID : null;
		this.setState({"userID": USERID});
		this.GatherUserInformation(USERID);
		this.loadTimeline(USERID);
	}

	eachTweet(x){
		return(
			<TouchableOpacity 
			  	style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}
				onPress={() => this.props.navigation.navigate("Event", {eventID: x.id})}
			>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					<Image 
						source={{ uri: x.ProfilePicture }} 
						resizeMode="contain" 
						style ={{height:54, width:54, borderRadius:27, margin:10}} 
						/>
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
							<Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>{x.FirstName} {x.LastName}</Text>
							<Text style={{color:'#fff', fontWeight:'500', fontSize:12}}> | @ {x.title}</Text>
						</View>
						<View style={{ margin:5, marginRight:10,}}>
							<Text style={{fontSize:13, color:'#fff', fontWeight:'400'}}>{x.description}</Text>
						</View>
					</View>
				</View>
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
									{this.state.firstName} {this.state.lastName}
								</Text>
							</View>
						<ScrollView style={{flex: 1}}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Image
							source={{ uri: this.state.ProfilePicture }}
							style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 10}}
							/>
						</View>
						<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
							<Text style={{flex: 1, fontSize: 26, color: 'white', fontFamily: 'bold'}}>
								{this.state.firstName} {this.state.lastName}
							</Text>
						</View>

						<View style={{flex:1, flexDirection: 'row', marginTop: 20,  marginHorizontal: 40, justifyContent: 'center', alignItems: 'center'}}>
							<CustomButton title={"Follow"} selected={false} userID={this.state.userID}/>
						</View>

						<View style={{flex: 1, marginTop: 20, width: SCREEN_WIDTH - 80, marginLeft: 40}}>
							<Text style={{flex: 1, fontSize: 15, color: 'white', fontFamily: 'regular'}}>
								{this.state.aboutMe}
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
							<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 0}}>
								<View style={{flex: 1}}>
								<Text style={styles.infoTypeLabel}>Age</Text>
								<Text style={styles.infoTypeLabel}>Birth Day</Text>
								<Text style={styles.infoTypeLabel}>Employer</Text>
								<Text style={styles.infoTypeLabel}>Current City</Text>
								<Text style={styles.infoTypeLabel}>Cell Phone</Text>
								<Text style={styles.infoTypeLabel}>Home Phone</Text>
								</View>
								<View style={{flex: 1, marginLeft: 10}}>
								<Text style={styles.infoAnswerLabel}>{this.state.dateOfBirth}</Text>
								<Text style={styles.infoAnswerLabel}>{this.state.dateOfBirth}</Text>
								<Text style={styles.infoAnswerLabel}>{this.state.employerName}</Text>
								<Text style={styles.infoAnswerLabel}>{this.state.currentCity}, {this.state.currentStateOrProvence}, {this.state.currentCountry}</Text>
								<Text style={styles.infoAnswerLabel}>{this.state.cellPhone}</Text>
								<Text style={styles.infoAnswerLabel}>{this.state.homePhone}</Text>
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
							onPress={() => this.setState({timelineToggle: this.state.timelineToggle ? (false) : (true)})}
							activeOpacity={0.5}
						/>
						{ this.state.timelineToggle 
							? (
								<View style={styles.container}>
									<ListView 
										enableEmptySections={true}
										//initialListSize={6}
										onEndReached={() => this.onEndReached()}
										//renderFooter={() => this.renderFooter()}
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
    paddingBottom: 20,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 20,
  }
});