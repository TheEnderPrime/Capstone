import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
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
import { RkButton } from 'react-native-ui-kitten';
import { RkTheme } from 'react-native-ui-kitten';
import { RkCard } from 'react-native-ui-kitten';
import { RkText } from 'react-native-ui-kitten';
import { Input, Button } from "react-native-elements";
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
	// loads event info from database
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

	// builds timeline one event at a time
	eachTweet(x){
		return(
			<TouchableOpacity 
			  	style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 5, paddingTop: 5 }}
				onPress={() => this.props.navigation.navigate("Posts", {postID: x.id})}
			>
		  		{/* <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
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
				</View> */}
{/* ########################################################################################################### */}
				<RkCard rkType='story'>		
					<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
						<Image rkCardImg source={{uri: x.photoOne}} style={{ flexGrow: 1 }} resizeMode="cover"/>
						<View style={{ backgroundColor: '#E0E0E0'}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25,  marginLeft: 10, textDecorationLine: 'underline'}}>
									{x.title}
								</RkText>
								<RkText style={{ margin: 5, marginLeft: 5, flex: 1, textAlign: 'right' }}>
									{x.time}
								</RkText>
							</View>
							<RkText style={{ marginLeft: 10, textAlign: 'left' }}>
								Description: {x.description}
							</RkText>
							<Button
							buttonStyle={styles.likeButton}
							containerStyle={{ marginBottom: 5, flex: 0 }}
							activeOpacity={0.8}
							title={ "Like" }
							// onPress={ this.like }
							titleStyle={styles.likeTextButton}
							/>
							{/* <View rkCardFooter style={{ marginBottom: 0, marginTop: 0}}>
								<RkButton rkType='small outline' style={{width: (Dimensions.get('window').width / 3), alignItems: 'center', marginRight: 5}}>Learn More</RkButton>
								<RkButton rkType='small outline'style={{width: (Dimensions.get('window').width / 3), alignItems: 'center', marginLeft: 5}}>Read later</RkButton>
							</View> */}
						</View>
					</View>
					{/* <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Colors.kite_greenMediumDark}}>
						<Image  source={{uri: x.ProfilePicture}} resizeMode="contain"
							style={{ width:80, height: 70, alignSelf: 'flex-start'}}/>
						<View style={{ flex: 1, flexDirection: 'row', marginTop: 5}}>
							<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 25 }}>{x.FirstName} {x.LastName}</RkText>
							<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 10 }}>{x.time}</RkText>
						</View>
					</View> */}
					{/* <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', backgroundColor: '#E0E0E0'}}>
						<Image rkCardImg source={{uri: x.PostImage}} style={{ flexGrow: 1 }} resizeMode="contain"/>
						<View>
						<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25,  marginLeft: 10, textDecorationLine: 'underline'}}>
								{x.title}
						</RkText>
						</View>
						<RkText style={{ margin: 10, alignSelf: 'flex-start' }}>
								Description: {x.description}
						</RkText>
					</View> */}
				</RkCard>


			</TouchableOpacity>
		)
	}

	
	render() {			
		return (
			<View style={styles.container}>
				<View style={styles.eventInfo}>
					<View style={{flex: 1, flexDirection: 'column'}}>
						<Text style={styles.titleText}>
							{this.state.title}
						</Text>

						<Text style={styles.descriptionText}>
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