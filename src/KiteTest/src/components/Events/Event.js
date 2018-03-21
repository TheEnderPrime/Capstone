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
	ActivityIndicator
} from 'react-native';

import Timeline from 'react-native-timeline-listview';
import Colors from '../../Colors/Colors';
import styles from './styles';

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
			eventTitle: "",
			eventDesc: "",
			eventStory: "",
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data,
		};
	}

	loadEvent = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Event.php?f=getEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				EventID: this.state.eventID,

				UserId: this.state.userID,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {

					this.setState({
						eventTitle: responseJson.eventData.title,
						eventDesc: responseJson.eventData.description,
						data: responseJson.eventArray,
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
	  	return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
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
		Alert.alert("YOU PRESSED THE BUTTON!");
		//this.props.navigation.navigate("Posts")
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

	
	render() {
		const { EventID } = this.state;
		return (
			
			
		<View style={styles.container}>
			
		<Text style={styles.titleText}>
			Event Title: {this.state.eventTitle}
		</Text>

		<Text style={styles.titleText}>
			Event Description: {this.state.eventDesc}
		</Text>
		
		<View style={styles.postTimeline}>
					<Timeline
						style={styles.timelineList}
						data={this.state.data}
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
						options={{
							refreshControl: (
								<RefreshControl
									refreshing={this.state.isRefreshing} 
									onRefresh={this.onRefresh}							
								/>
							),
							//renderFooter: this.renderFooter,
							//onEndReached: this.onEndReached,
						}}
						
						
					/>
				</View>
		
		<View style={styles.button}>
		<Button 
			style={buttonColor = '#78B494'} 
			title="New Post" 
			
			onPress = {() => this.props.navigation.navigate('PostCreator',{EventID})}
				/>
		</View>
	</View>

		);
	}
}



	export default Event;