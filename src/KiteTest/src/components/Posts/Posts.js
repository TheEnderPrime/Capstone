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
			isRefreshing: false,
			waiting: false,
			selected: null,
			data: this.data, 
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

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentWillMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		const {params} = this.props.navigation.state;
		const PostID =  params ? params.postID : null;
		this.setState({postID: PostID});
		this.loadPost();
	}

	printPost() {
		
		var str = this.state.story;
		var length = str.length;
		var cutLength = length / 3;
		var parsedText = str.match(new RegExp('.{1,' + cutLength + '}', 'g')); 

		var tmp_array = [
			{ text: parsedText[0], img: this.state.photo1 },
			{ text: parsedText[1], img: this.state.photo2 },
			{ text: parsedText[2], img: this.state.photo3 },
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
					<Text style={styles.title}>{this.state.story}</Text>
				</View>

				<ScrollView style={styles.postView}>
				<Text>{this.state.story}</Text>
					{/* {this.printPost()} */}
				</ScrollView>
			</View>

		);
	}
}