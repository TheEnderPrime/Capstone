import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const IMAGE_SIZE = SCREEN_WIDTH - 80;

export default class Posts extends React.Component {

	constructor(){
		super()
		this.state = {
			userID: 0,
			eventID: 0,
			postID: 0,
			eventDesc: "",
			eventStory: "",
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data, 
			title: "Test Title"
		}
	}

	loadPost = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=getPost', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				
				PostID: this.state.postID,

				UserID: this.state.userID,
				
            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // If server response message same as Data Matched
                if (responseJson.isValid === 'valid') {

					this.setState({
						eventTitle: responseJson.post.title,
						eventStory: responseJson.post.PostText,
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

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		const {params} = this.props.navigation.state;
		const PostID =  params ? params.postID : null;
		this.setState({postID: PostID});
		//this.loadPost();
	}

	printPost() {
		var tmp_array = [
			{ text: "Test1", img: require("../../images/pic1.jpg") },
			{ text: "Test2", img: require("../../images/pic2.jpg") },
			{ text: "Test3", img: require("../../images/pic3.jpg") },
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
							source={news.img}
						/>
					</View>
				</View>
			);
		});
	}

 	render() {
		return (
			<View style={styles.container}>
				
				<View style={styles.header}>
					<Text style={styles.title}>{this.state.title}</Text>
					<Text style={styles.title}>Overall Likes and Comments</Text>
				</View>

				<ScrollView style={styles.postView}>
					{this.printPost()}
				</ScrollView>
			</View>

		);
	}
}