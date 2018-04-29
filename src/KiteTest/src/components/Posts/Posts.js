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
  ActivityIndicator
} from 'react-native';

import Timeline from 'react-native-timeline-listview';

import styles from './styles';

class Posts extends React.Component {

	constructor(){
		super()
		this.state = {
			userID: 0,
			eventID: 0,
			postID: 0,
			eventTitle: "",
			eventDesc: "",
			eventStory: "",
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
		this.loadPost();
	}

 	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>{this.state.eventTitle}</Text>
					<Text>Overall Likes and Comments</Text>
				</View>

				<View style={styles.postTimeline}>
					<Text>{this.state.eventStory}</Text>
				</View>
			</View>

		);
	}
}



export default Posts;