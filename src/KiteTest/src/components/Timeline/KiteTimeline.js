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
	ActivityIndicator,
	Dimensions,
	ListView,
	Image,
} from 'react-native';

import Timeline from 'react-native-timeline-listview';

import styles from './styles';

// '../../images/placeholderProfilePicture.jpg'
var {height, width} = Dimensions.get('window');
var image1 = require('../../images/placeholderProfilePicture.jpg')
var image2 = require('../../images/placeholderProfilePicture.jpg')
var image3 = require('../../images/placeholderProfilePicture.jpg')
var image4 = require('../../images/placeholderProfilePicture.jpg')
var image5 = require('../../images/placeholderProfilePicture.jpg')
var image6 = require('../../images/placeholderProfilePicture.jpg')
var image7 = require('../../images/placeholderProfilePicture.jpg')
var image8 = require('../../images/placeholderProfilePicture.jpg')
var image9 = require('../../images/placeholderProfilePicture.jpg')
var image10 = require('../../images/placeholderProfilePicture.jpg')
var image11 = require('../../images/placeholderProfilePicture.jpg')


// var data = [{
// 	"id": 1,
// 	"first_name": "Gina",
// 	"last_name": "Hill",
// 	"tweet": "Phasellus sit ag lorem, vitae mattis elit.",
// 	"time": "9:48 AM",
// 	image: image1,
// }, {
// 	"id": 2,
// 	"first_name": "Marta",
// 	"last_name": "Little",
// 	"tweet": "Vivamus tortor. D sollicitudin ut, suscipitique. Fusce con sed augue.",
// 	"time": "8:39 PM",
// 	image: image2,
// }, {
// 	"id": 3,
// 	"first_name": "Christy",
// 	"last_name": "Powell",
// 	"tweet": "Integer pede justo, lacinia eget, tinciduntet, sem. Fusce consequat. Nulla nisl. Nunc n",
// 	"time": "8:01 AM",
// 	image: image3,
// }, {
// 	"id": 4,
// 	"first_name": "Cynthia",
// 	"last_name": "Nichols",
// 	"tweet": "Donec quis orci eget orndimentum. Curabitur in libert. Nulla tempus.",
// 	"time": "3:36 AM",
// 	image: image4,
// }, {
// 	"id": 5,
// 	"first_name": "Maria",
// 	"last_name": "Harrison",
// 	"tweet": "Ut at dolor quis odio consequat varius. Integer ac let ac nulla.",
// 	"time": "9:34 AM",
// 	image: image5
// }, {
// 	"id": 6,
// 	"first_name": "Ana",
// 	"last_name": "Porter",
// 	"tweet": "Donec odit sapien arcu sed augue. Aliquam erat volutpat.",
// 	"time": "3:09 PM",
// 	image: image6
// }, {
// 	"id": 7,
// 	"first_name": "Clara",
// 	"last_name": "Bennett",
// 	"tweet": "Mauris.",
// 	"time": "8:04 PM",
// 	image: image7
// }, {
// 	"id": 8,
// 	"first_name": "Brenda",
// 	"last_name": "Rogers",
// 	"tweet": "ellentesque.",
// 	"time": "12:46 PM",
// 	image: image8
// }, {
// 	"id": 9,
// 	"first_name": "Annie",
// 	"last_name": "Daniels",
// 	"tweet": "Phasellus sit ulla ac enim. In tempor, turpis nec euismod scelerisque, qt.",
// 	"time": "9:35 PM",
// 	image: image9
// }, {
// 	"id": 10,
// 	"first_name": "Bri",
// 	"last_name": "Franklin",
// 	"tweet": "Nullanisi vulputate nonummy. Maecenas tincidunt lacusvelit. Vivamus rus.",
// 	"time": "11:22 AM",
// 	image: image10
// }];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class KiteTimeline extends React.Component {
	
	constructor(){
		super()
		this.onEndReached 	= this.onEndReached.bind(this)
		this.renderSelected = this.renderSelected.bind(this)
		this.onRefresh 		= this.onRefresh.bind(this)
		this.onEventPress 	= this.onEventPress.bind(this)

		this.data = []
		
		this.state = {
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
			// data: this.data,
		}
	}

	loadTimeline = () => {

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

					this.setState({
						//data: responseJson.timeline,
						dataSource: ds.cloneWithRows(responseJson.timeline),
						//isRefreshing: false
					})
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

			this.loadTimeline();
			
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

	async componentWillMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		this.loadTimeline();
	}

	eachTweet(x){
		return(
		  	<TouchableOpacity style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					{ <Image source = {image1} resizeMode="contain" style ={{height:54, width:54, borderRadius:27, margin:10}} /> }
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
							<Text style={{fontWeight:'600', fontSize:12}}>{x.title} {x.title}</Text>
							<Text style={{fontWeight:'500', fontSize:12}}> | @{x.title}</Text>
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
				{/* <View style={styles.timelineContainer}>
					{this.renderSelected()}
					{ <Timeline
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
						enableEmptySections={true}
						onEventPress={this.onEventPress}
						options={{
							refreshControl: (
								<RefreshControl
									refreshing={this.state.isRefreshing} 
									onRefresh={this.onRefresh}							
								/>
							),
							//THESE ARE FOR ADDING ADDITIONAL EVENTS UPON HITTING THE BOTTOM
							//renderFooter: this.renderFooter,
							//onEndReached: this.onEndReached,
						}}
					/> }
				</View> */}
				<ListView 
					enableEmptySections={true}
					initialListSize={5} //renders 6

      				dataSource = {this.state.dataSource}
     				renderRow = {(rowData) => this.eachTweet(rowData)}
      			/>
			</View>
		);
	}

}
export default KiteTimeline;