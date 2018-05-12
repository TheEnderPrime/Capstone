import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	AsyncStorage,
	RefreshControl,
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	ListView
} from 'react-native';

import styles from './styles';
import { RkButton } from 'react-native-ui-kitten';
import { RkTheme } from 'react-native-ui-kitten';
import { RkCard } from 'react-native-ui-kitten';
import { RkText } from 'react-native-ui-kitten';
import { Input, Button } from "react-native-elements";
import Colors from '../../Colors/Colors';
import Icon  from "react-native-vector-icons/FontAwesome";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_SIZE = SCREEN_WIDTH - 80;

var { height, width } = Dimensions.get('window');
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Posts extends React.Component {

	constructor() {
		super()
		this.state = {
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data,
			story: "loading",
			commentToggle: false,
		}
	}

	// pulls text and image uris from the database
	getPost = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=getPost', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({

				PostID: this.state.postID,

				//UserID: this.state.userID,

			})

		}).then((response) => response.json())
			.then((responseJson) => {

				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {

					this.setState({
						title: responseJson.post.title,
						story: responseJson.post.PostText,
						photo1: responseJson.post.PictureOne,
						photo2: responseJson.post.PictureTwo,
						photo3: responseJson.post.PictureThree,
						isRefreshing: false
					})
					//parse array from responseJson
					// Alert.alert(responseJson.post.PostText.toString())
					// this.printPost(responseJson.post.PostText, responseJson.post.PostText.length)
				}
				else {
					Alert.alert(responseJson.error);
				}

			}).catch((error) => {
				console.error(error);
			});
	}

	getComments = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=getComments', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({

				PostID: this.state.postID,

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

	setUserIdAsync(state) {
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentWillMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({ userID: user });
		const { params } = this.props.navigation.state;
		const PostID = params ? params.postID : null;
		const EventID = params ? params.eventID : null;
		this.setState({ postID: PostID });
		this.setState({ eventID: EventID });

		this.getPost();
		this.getComments();
	}

	// parses text and text-wraps images
	printPost() {

		var i;
		var str;
		for (i = 0; i < 10000; i++) {
			if (this.state.story != "loading") {
				var str = this.state.story;
				var length = str.length;
				var cutLength = Math.ceil(length / 3);
				var parsedText = str.match(new RegExp('.{1,' + cutLength + '}', 'g'));

				var tmp_array = [
					{ text: parsedText[0], img: this.state.photo1 == "-" ? null : this.state.photo1 },
					{ text: parsedText[1], img: this.state.photo2 == "-" ? null : this.state.photo2 },
					{ text: parsedText[2], img: this.state.photo3 == "-" ? null : this.state.photo3 },
				];

				return tmp_array.map(function (news, i) {
					return (
						<View key={i}>
							<Text style={styles.postText}>{news.text}</Text>
							<View>
								<Image style=
									{{
										flex: 1,
										justifyContent: 'center',
										width: IMAGE_SIZE,
										height: IMAGE_SIZE,
										borderRadius: 10,
										padding: 15
									}}
									source={{ uri: news.img }}
								/>
							</View>
						</View>
					);
				});
				break;
			}
		}
	}

	eachTweet(x) {
		return (
			<TouchableOpacity
				style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5, paddingTop: 5 }}
				onPress={() => { }}
			>
				<RkCard rkType='story'>
					<View style={{
						flex: 1, flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius: 10,
						paddingTop: 7, borderTopWidth: 1, backgroundColor: Colors.kite_greenMediumDark
					}}>
						<Image source={{ uri: x.ProfilePicture }} resizeMode="contain"
							style={{ width: 80, height: 70, alignSelf: 'flex-start' }} />
						<View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
							<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 25 }}>{x.FirstName} {x.LastName}</RkText>
						</View>
					</View>
					<View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
						<View style={{ backgroundColor: '#E0E0E0' }}>
							<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25, marginLeft: 10, padding: 15 }}>
								{x.PostText}
							</RkText>
						</View>
					</View>
				</RkCard>
			</TouchableOpacity>
		)
	}

	render() {
		return (

			<View style={styles.container}>
				<View style={{flex: 1, flexDirection: 'row'}}>
					<View style={styles.header}>
						<Text style={styles.title}>
							{this.state.title}
						</Text>
					</View>
					<TouchableOpacity style={{ flex: 1, alignItems: "flex-end", paddingTop: 5, height: 40, }}>
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
							onPress={() => this.props.navigation.navigate('PostEdit',
								{
									eventID: this.state.eventID,
									userID: this.state.userID,
									postID: this.state.postID,
									title: this.state.title,
									story: this.state.story,
								}
							)}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.postView}>
					<ScrollView style={{ flex: 5}}>
						{this.printPost()}
						<Button
							containerStyle={{ marginVertical: 20 }}
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
							buttonStyle={{ height: 55, width: SCREEN_WIDTH - 40, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
							title="Expand Comments"
							titleStyle={{ fontFamily: 'regular', fontSize: 20, color: 'white', textAlign: 'center' }}
							onPress={() => this.setState({ commentToggle: this.state.commentToggle ? (false) : (true) })}
							activeOpacity={0.5}
						/>
						{this.state.commentToggle
							? (
								<View style={styles.comment}>
									<Button
										title="Make Comment"
										onPress={() => this.props.navigation.navigate('CommentCreator', { postID: this.state.postID, eventID: this.state.eventID })}
									/>
									<ListView
										enableEmptySections={true}
										dataSource={this.state.dataSource}
										renderRow={(rowData) => this.eachTweet(rowData)}
									/>
								</View>
							) :
							(
								null
							)
						}
					</ScrollView>
				</View>

			</View>

		);
	}
}
RkTheme.setType('RkCard', 'story', {
	img: {
		height: 100,
		opacity: 0.7
	},
	header: {
		alignSelf: 'center'
	},
	content: {
		alignSelf: 'center'
	}
});