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
} from 'react-native';

import Timeline from 'react-native-timeline-listview';
import Colors from '../../Colors/Colors';
import styles from './styles';

class Event extends React.Component {

	constructor(props) {
		super(props);
		this.onEventPress = this.onEventPress.bind(this)
		this.data = [
			{time: '09:00', title: 'Newest Post ', description: 'Event 1 Description'},
		    {time: '10:45', title: 'Post 2', description: 'Event 2 Description'},
		    {time: '12:00', title: 'Post 3', description: 'Event 3 Description'},
		    {time: '14:00', title: 'Post 4', description: 'Event 4 Description'},
			{time: '16:30', title: 'Post 5', description: 'Event 5 Description'},
			{time: '14:00', title: 'Oldest Post 6', description: 'Event 6 Description'},
		]
		this.state = {
			userId: 0,
			EventTitle: "",
			EventDesc: "",
			EventStory: "",
			selected: null,
		};
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
		const Title = params ? params.EventTitle : null;
		const Desc =  params ? params.EventDesc : null;
		this.setState({EventTitle: Title});
		this.setState({EventDesc: Desc});
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
	//this.props.navigation.navigate("Posts")
  }

	
	render() {

		return (
			
		<View style={styles.container}>
			
		<Text style={styles.titleText}>
			Event Title: {this.state.EventTitle}
		</Text>

		<Text style={styles.titleText}>
			Event Description: {this.state.EventDesc}
		</Text>
		
		<View style={styles.postTimeline}>
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
		
		<View style={styles.button}>
		<Button 
			style={buttonColor = '#78B494'} 
			title="New Post" 
			onPress = {() => this.UserCreateEvent()}
				/>
		</View>
	</View>

		);
	}
}



	export default Event;