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

		this.state = {
			userId: 0,
			eventID: 0,
			postID: 0,
			title: "",
			description: "",
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
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
				
				UserID: this.state.userID,

				EventID: this.state.eventID,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {

					this.setState({ isRefreshing: true });
					this.setState({
						data: responseJson.eventData,
						dataSource: ds.cloneWithRows(responseJson.eventArray),
						title: responseJson.eventData.title,
						description: responseJson.eventData.description,
						isRefreshing: false,
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
				onPress={() => this.props.navigation.navigate("Posts", {postID: x.id})}
			>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					<Image 
						source={{ uri: x.ProfilePicture }} 
						resizeMode="contain" 
						style ={{height:54, width:54, borderRadius:27, margin:10}} 
					/>
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
							<Text style={{fontWeight:'600', fontSize:12, color: '#fff'}}>{x.FirstName} {x.LastName}</Text>
							<Text style={{fontWeight:'500', fontSize:12, color: '#fff'}}> | @ {x.title}</Text>
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
				<View style={styles.eventInfo}>
					<View style={{flex: 1, flexDirection: 'column'}}>
						<Image 
							source={{
								uri: "" === ""
								? "https://static.pexels.com/photos/428336/pexels-photo-428336.jpeg"
								: x.ProfilePicture
							}} 
							resizeMode="contain" 
							style ={{height:108, width:108, borderRadius:54, margin:10}} 
						/>
					</View>
					<View style={{flex: 1, flexDirection: 'column', marginTop: 15}}>
						<Text style={styles.titleText}>
							{this.state.title}
						</Text>

						<Text style={styles.titleText}>
							{this.state.description}
						</Text>
					</View>
				</View>
				
				<View style={styles.postTimeline}>
					<View style={styles.container}>
						<ListView 
							enableEmptySections={true}
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