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

import { RkButton } from 'react-native-ui-kitten';
import { RkTheme } from 'react-native-ui-kitten';
import { RkCard } from 'react-native-ui-kitten';
import { RkText } from 'react-native-ui-kitten';
import { Input, Button } from "react-native-elements";
import Icon  from "react-native-vector-icons/FontAwesome";
import Colors from '../../Colors/Colors';
import styles from './styles';

//Custom Button
class CustomButton extends Component {
	constructor() {
		super();

		this.state = {
			selected: false,
			userID: 0
		};
	}

	getDoesLike = () => {
		for (i = 0; i < 10000; i++) {
			if (this.state.userID != undefined && this.props.postID != undefined) {
				//Alert.alert("number one: " + this.props.postID + " also " + this.state.userID);
				fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=getDoesLike', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({

						PostID: this.props.postID,

						UserID: this.state.userID,

					})
				}).then((response) => response.json())
					.then((responseJson) => {
						// If server response message same as Data Matched
						if (responseJson.isValid === 'valid') {
							if (responseJson.doesLike === 'true') {
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

	LikePost = () => {
		for (i = 0; i < 10000; i++) {
			if (this.state.userID != 0) {
				fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=LikePost', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({

						PostID: this.props.postID,

						UserID: this.state.userID,

					})
				}).then((response) => response.json())
					.then((responseJson) => {
						// If server response message same as Data Matched
						if (responseJson.isValid === 'valid') {
							if (responseJson.isNowCurrentlyLiking === 'true') {
								//Alert.alert("Post Liked");
							} else {
								//Alert.alert("Removed from Community");
							}
						} else {
							Alert.alert("error");
						}
					});
				break;
			}
		}
	}

	sendLike(selected) {
		this.LikePost();
		this.setState({ selected: !selected });
	}

	setUserIdAsync(state) {
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}


	async componentDidMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({ userID: user });

		this.getDoesLike();
	}

	render() {
		const { title } = this.props;
		const { selected } = this.state;

		return (
			<Button
				title={title}
				titleStyle={{ fontSize: 15, color: 'white', fontFamily: 'regular' }}
				buttonStyle={selected ? { backgroundColor: "#dc5c56",
				alignSelf: 'center',
				borderRadius: 10,
				height: 50,
				width: 200,
				margin: 10 } : { backgroundColor: "#e8938e",
				alignSelf: 'center',
				borderRadius: 10,
				height: 50,
				width: 200,
				margin: 10}}
				containerStyle={{ }}
				onPress={() => { this.sendLike(this.state.selected) }}
			/>
		);
	}
}

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Event extends React.Component {

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
			doesLike: false,
			dataSource: ds.cloneWithRows([]),
			dummy: 0,
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
					onPress={() => this.props.navigation.navigate("Posts", {postID: x.id, eventID: x.EventId})}
				>
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
									{x.description}
								</RkText>

								<CustomButton title={"Like"} selected={false} postID={x.id}/>

							</View>
						</View>
					</RkCard>
				</TouchableOpacity>
			)
	}

	
	render() {			
		return (
			<View style={styles.container}>
				<View style={styles.eventInfo}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 5, flexDirection: 'column'}}>
							<Text style={styles.titleText}>
								{this.state.title}
							</Text>

							<Text style={styles.descriptionText}>
								{this.state.description}
							</Text>
						</View>
						<TouchableOpacity style={{flex: 1, alignItems: "flex-end", paddingTop: 5 }}>
						<Button
							title=''
							icon={
								<Icon
								name='gear'
								size={20}
								color='white'
								/>
							}
							buttonStyle={{
								backgroundColor: 'rgba(47,44,60,1)',
								width: 40,
								height: 40,
							
							}}
							containerStyle={{ marginRight: 20 }}
							onPress = {() =>  this.props.navigation.navigate('EventEdit', 
								{ 
									eventID: this.state.eventID, 
									userID: this.state.userID, 
									title: this.state.title, 
									description: this.state.description,
								} )}
						/>
						</TouchableOpacity>
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