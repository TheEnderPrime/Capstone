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

export default class PostEdit extends Component {
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
		const USERID = params.userID ? params.userID : 0;
		const STORY = params.story ? params.story : 0;
		const TITLE = params.TITLE ? params.TITLE : 0;
		const POSTID = params.postID ? params.postID : 0;
		this.setState({eventID: EVENTID});
		this.setState({userID: USERID});
		this.setState({title: TITLE});
		this.setState({postID: POSTID});
	}

	//This page displays textinput for title and story. Sends the data next to PostImageCreator to upload pictures

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textBox}>
					<Text style={styles.text}>
						What is the name of this story?
					</Text>
					<Input inputContainerStyle={{
						borderRadius: 40,
						borderWidth: 1,
						borderColor: "rgba(110, 120, 170, 1)",
						height: 50,
						width: SCREEN_WIDTH - 50,
						marginVertical: 10
					}}
						leftIcon={
							<SimpleIcon
								name="user"
								color="rgba(110, 120, 170, 1)"
								size={25}
							/>
						}
						iconContainerStyle={{ marginLeft: 20 }}
						placeholder="Story Title"
						placeholderTextColor="rgba(110, 120, 170, 1)"
						inputStyle={{ marginLeft: 10, color: "white" }}
						autoCapitalize="none"
						autoCorrect={false}
						keyboardAppearance="light"
						keyboardType="default"
						returnKeyType="next"
						ref={input => (this.usernameInput = input)}
						onChangeText={(title) => this.setState({ title })}
						blurOnSubmit={false}
					/>
				</View>
				<ScrollView style={styles.postInput}>
					<TextInput
						style={{ height: 400, borderColor: 'gray', borderWidth: 1, textAlignVertical: "top", color: '#fff', }}
						multiline = {true}
						onChangeText={(text) => this.setState({ text })}
						value={this.state.text}
					/>
				</ScrollView>
				<Button style={styles.button} onPress={() => this.props.navigation.navigate("PostImageEdit", 
					{
						story: this.state.text.replace(/[\t\n\r]/gm,''), 
						eventID: this.state.eventID, 
						userID: this.state.userID,
						postID: this.state.postID, 
						title: this.state.title, 
					}
				)}
					title="Next"
				/>
			</View>
		)
	}
}