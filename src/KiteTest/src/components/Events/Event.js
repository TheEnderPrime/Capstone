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
	Alert,
	AsyncStorage,
	RefreshControl,
	ActivityIndicator,
	Dimensions,
	ListView,
	Image,
} from 'react-native';

import Timeline from 'react-native-timeline-listview';
import Colors from '../../Colors/Colors';
import styles from './styles';

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Event extends React.Component {

	constructor(props) {
		super(props);

		this.onEndReached 	= this.onEndReached.bind(this)
		this.renderSelected = this.renderSelected.bind(this)
		this.onRefresh 		= this.onRefresh.bind(this)
		this.onEventPress 	= this.onEventPress.bind(this)

		this.data = []
		// 	{time: '09:00', title: 'Newest Post ', description: 'Event 1 Description'},
		//     {time: '10:45', title: 'Post 2', description: 'Event 2 Description'},
		//     {time: '12:00', title: 'Post 3', description: 'Event 3 Description'},
		//     {time: '14:00', title: 'Post 4', description: 'Event 4 Description'},
		// 	{time: '16:30', title: 'Post 5', description: 'Event 5 Description'},
		// 	{time: '14:00', title: 'Oldest Post 6', description: 'Event 6 Description'},
		// ]
		this.state = {
			userId: 0,
			eventID: 0,
			postID: 0,
			eventTitle: "",
			eventDesc: "",
			eventStory: "",
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data,
			dataSource: ds.cloneWithRows([]),
		};
	}

	loadEvent = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getMainTimeLine', {
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

	onRefresh(){
		//set initial data
		this.setState({isRefreshing: true});
		//refresh to initial data
		setTimeout(() => {

			this.loadEvent();
			
		}, 2000);
	}
	
	onEndReached() {
		//fetch next data
		if (!this.state.waiting) {
			this.setState({waiting: true});
	
			//fetch and concat data
			setTimeout(() => {
	
			//refresh to concat data
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

	renderSelected(){
		if(this.state.selected)
	  	return <Text style={{marginTop:10}}> Selected event: {this.state.selected.title} at {this.state.selected.time} </Text>
	}
	
	renderFooter() {
		//show loading indicator
		if (this.waiting) {
			return <ActivityIndicator />;
		} else {
			return <Text>~</Text>;
		}
	}

	onEventPress(data){
		this.setState({selected: data})
		Alert.alert(this.state.selected.id);
		this.props.navigation.navigate('Posts', {postID: this.state.selected.id})
	  }
	  
	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		const {params} = this.props.navigation.state;
		const EventID =  params ? params.eventID : null;
		this.setState({eventID: EventID});
		this.loadEvent();
	}

	eachTweet(x){
		return(
			<TouchableOpacity 
			  	style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}
				onPress={() => this.props.navigation.navigate("Post", {postID: x.id})}
			>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					<Image 
						source={{
							uri: "" === ""
							? "https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg"
							: x.image
						}} 
						resizeMode="contain" 
						style ={{height:54, width:54, borderRadius:27, margin:10}} 
						/>
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
							<Text style={{fontWeight:'600', fontSize:12}}>{x.title} {x.title}</Text>
							<Text style={{fontWeight:'500', fontSize:12}}> | @Baugh{/*{x.title}*/}</Text>
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
			<View style={styles.container}>
				<Text style={styles.titleText}>
					Title: {this.state.eventTitle}
				</Text>

				<Text style={styles.titleText}>
					Description: {this.state.eventDesc}
				</Text>
						
				<View style={styles.postTimeline}>
					<View style={styles.container}>
						<ListView 
							enableEmptySections={true}
							initialListSize={6}
							onEndReached={() => this.onEndReached()}
							//renderFooter={() => this.renderFooter()}
							dataSource = {this.state.dataSource}
							renderRow = {(rowData) => this.eachTweet(rowData)}
						/>
					</View>
				</View>
				<View style={styles.button}>
					<Button 
						style={buttonColor = '#78B494'} 
						title="New Post" 
					
						onPress = {() => this.props.navigation.navigate('PostCreator', {eventID: this.state.eventID})}
					/>
				</View>
			</View>
			
		);
	}
}

export default Event;