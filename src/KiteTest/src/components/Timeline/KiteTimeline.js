import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  	Platform,
  	StyleSheet,
  	Text,
  	View,
  	Button,
  	TouchableOpacity,
	AsyncStorage,
	Alert,
	RefreshControl,
	ActivityIndicator
} from 'react-native';

import Timeline from 'react-native-timeline-listview';

import styles from './styles';

class KiteTimeline extends React.Component {
	
	constructor(){
		super()
		this.onEndReached 	= this.onEndReached.bind(this)
		this.renderSelected = this.renderSelected.bind(this)
		this.onRefresh 		= this.onRefresh.bind(this)
		this.onEventPress 	= this.onEventPress.bind(this)

		this.data = [
			{time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
			{time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
			{time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
		    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
			{time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
			{time: '12:00', title: 'Event 6', description: 'Event 6 Description'},
		    {time: '14:00', title: 'Event 7', description: 'Event 7 Description'},
		    {time: '16:30', title: 'Event 8', description: 'Event 8 Description'}
		]
		
		this.state = {
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data,
		}
	}

	loadTimeline = () => {
		const { userID } = this.state;
		const { timelineType } = "main";

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Event.php?f=getEvent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				//UserID: userID,

				//TimelineType: //timelineType
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {
					
					Alert.alert(responseJson);
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
			//refresh to initial data
			
			this.setState({
			  	data: [
				{time: '09:00', title: 'Event 1111', description: 'Event 1 Description'},
				
			],
				//this.loadTimeline(),
			  	isRefreshing: false
			});
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
		if(this.state.selected) this.props.navigation.navigate("Event", {EventTitle: this.state.selected.title, EventDesc: this.state.selected.description})
  	}

  	renderSelected(){
		if(this.state.selected)
	  	return <Text style={{marginTop:10}}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
	}

  	render() {
		return (
			<View style={styles.container}>
				<View style={styles.timelineContainer}>
					{/* {this.renderSelected()} */}
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
							renderFooter: this.renderFooter,
							onEndReached: this.onEndReached,
						}}
					/>
				</View>

			</View>
		);
	}

}
  export default KiteTimeline;