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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

//Custom Button
class CustomButton extends Component {
  	constructor() {
    	super();
		
	    this.state = {
			selected: false,
			//title: this.state.selected ? "follow" : "following",
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

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Community extends Component {
  	constructor(props) {
    	super(props);

    	this.state = {
			communityID: 1,
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
	  
	getCommunityTimeLine = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getCommunityTimeLine', {
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
		
  	async componentWillMount() {
		this.setState({ fontLoaded: true });
		const user = await AsyncStorage.getItem('userID')
		// await this.setUserIdAsync({userID: user});
		// if(this.state.communityID != null){
		// 	this.GatherCommunityInformation(this.state.communityID);
		// }
		const {params} = this.props.navigation.state;
		const CommunityID =  params ? params.communityID : null;
		this.setState({communityID: CommunityID});
		this.getCommunity();
	}

	eachTweet(x){
		return(
			<TouchableOpacity 
			  	style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}
				onPress={() => this.props.navigation.navigate("Event", {eventID: x.id})}
			>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					<Image 
						source={{ uri: this.state.ProfilePicture }} 
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
							<CustomButton title={"Follow"} selected={false} />
						</View>

						<View style={{flex: 1, marginTop: 20, width: SCREEN_WIDTH - 80, marginLeft: 40}}>
							<Text style={{flex: 1, fontSize: 15, color: 'white', fontFamily: 'regular'}}>
							{this.state.aboutUs}
							</Text>
						</View>

						<View style={{flex: 1, marginTop: 30}}>
							<Text style={{flex: 1, fontSize: 15, color: 'rgba(216, 121, 112, 1)', fontFamily: 'regular', marginLeft: 40}}>
							FOLLOWERS
							</Text>
							<View style={{flex: 1, flexDirection: 'row', marginTop: 20, marginHorizontal: 30}}>
								<View style={{flex: 1, flexDirection: 'row'}}>
									<View style={{}}>
									<Text style={styles.infoTypeLabel}>Threads</Text>
									<Text style={styles.infoTypeLabel}>Posts</Text>
									<Text style={styles.infoTypeLabel}>Members</Text>
									
									</View>
									<View style={{marginLeft: 10}}>
									<Text style={styles.infoAnswerLabel}>{this.state.numOfThreads}</Text>
									<Text style={styles.infoAnswerLabel}>{this.state.numOfPosts}</Text>
									<Text style={styles.infoAnswerLabel}>{this.state.numOfMembers}</Text>
									
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

// class Community extends React.Component {
	
// 	constructor(){
// 		super()
// 		this.onEndReached 	= this.onEndReached.bind(this)
// 		this.renderSelected = this.renderSelected.bind(this)
// 		this.onRefresh 		= this.onRefresh.bind(this)
// 		this.onEventPress 	= this.onEventPress.bind(this)

// 		this.data = []

// 		this.state = {
// 			communityName: "Oregon State University",
// 			profilePic: '../../images/placeholderProfilePicture.jpg',
// 			numOfThreads: 0,
// 			numOfPosts: 0,
// 			numOfMembers: 0,
// 			isRefreshing: false,
// 			waiting: false,
// 			selected: null,
// 			data: this.data,
// 			selected: null,
// 		};
// 	}

// 	onRefresh(){
// 		//set initial data
// 	}
	
// 	onEndReached() {
// 		//fetch next data
// 	}
	
// 	renderFooter() {
// 		//show loading indicator
// 		if (this.state.waiting) {
// 				return <ActivityIndicator />;
// 		} else {
// 				return <Text>~</Text>;
// 		}
// 	}

// 	componentDidMount() {
// 		//this.loadTimeline();
// 	}

// 	loadTimeline = () => {
// 		const { userID } = this.state;
// 		const { timelineType } = "main";

// 		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getCommunityTimeLine', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
				
// 				UserID: userID,

// 				//TimelineType: //timelineType
				
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
// 		this.loadTimeline();
// 	}

// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<View style={styles.header}>
// 					<Image
// 						style={styles.profilePicture}
//           				source={require('../../images/placeholderProfilePicture.jpg')}
// 					/>
// 					<View style={styles.profileText}>
// 						<Text style={styles.text}>{this.state.communityName}</Text>
// 					</View>
// 				</View>

// 				<View style={styles.statBoxesContainer}>
					
// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfThreads}</Text>
// 						<Text style={styles.statCountTitles}>Threads</Text>
// 					</View>

// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfPosts}</Text>
// 						<Text style={styles.statCountTitles}>Posts</Text>
// 					</View>

// 					<View style={styles.statBox}>
// 						<Text style={styles.statNumberCount}>{this.state.numOfMembers}</Text>
// 						<Text style={styles.statCountTitles}>Members</Text>
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
// 						enableEmptySections={true}
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



// 	export default Community;