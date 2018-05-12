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
	ScrollView,
	Image,
	ActivityIndicator,
	Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Input } from 'react-native-elements';
import Colors from '../../Colors/Colors';
import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class CommentCreator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			size: 0,
			hasUploaded: false,
			imgURL1: "-",
			imgURL2: "-",
			imgURL3: "-",
			userID: 0,
			eventID: 0,
			UserTitle: "",
			UserDesc: "",
			UserStory: ""
		}
	}

	// send comment to database
	sendData() {
		Alert.alert("sendData: " + this.state.userID + " : " + this.state.text + " : " + this.state.postID + " : " + this.state.eventID + " hi mom");
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=createPost', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				UserID: this.state.userID,
				Story: this.state.text,
				isComment: this.state.postID,
				EventID: this.state.eventID,
			})
		});
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}
		
  	async componentDidMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		const { params } = this.props.navigation.state;
		const EVENTID = params.eventID ? params.eventID : 0;
		const POSTID = params.postID ? params.postID : 0;
		this.setState({postID: POSTID});
        this.setState({eventID: EVENTID});
	}


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textBox}>
					<Text style={styles.text}>
						Comment Here
					</Text>
				</View>
				<ScrollView style={styles.postInput}>
					<TextInput
						style={{ height: 400, borderColor: 'gray', borderWidth: 1, textAlignVertical: "top", color: '#fff', }}
						multiline = {true}
						onChangeText={(text) => this.setState({ text })}
						value={this.state.text}
					/>
				</ScrollView>
				<Button style={styles.button} onPress={() => this.sendData()}
					title="Make Comment"
				/>
			</View>
		)
	}
}