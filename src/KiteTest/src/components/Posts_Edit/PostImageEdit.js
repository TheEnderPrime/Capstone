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
	ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyDpbDjvHHsLvdkOxwgSXohkVOErHMqPNWw",
	authDomain: "kite-mobile.firebaseapp.com",
	storageBucket: "kite-mobile.appspot.com",
}
try{
    firebase.initializeApp(config);
} catch(err) {
    // Alert.alert("Firebase already initialized");
}
const storage = firebase.storage();

const uploadImage = (uri, mime = 'image/jpeg') => {
	// Prepare Blob support;
	const Blob = RNFetchBlob.polyfill.Blob
	window.Blob = Blob;
	const fs = RNFetchBlob.fs;
	window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

	return new Promise((resolve, reject) => {
		const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
		const sessionId = new Date().getTime()
		let uploadBlob = null
		const imageRef = storage.ref('images').child(`${sessionId}`)

		fs.readFile(uploadUri, 'base64')
			.then((data) => {
				return Blob.build(data, { type: `${mime};BASE64` })
			})
			.then((blob) => {
				uploadBlob = blob
				return imageRef.put(blob, { contentType: mime })
			})
			.then(() => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then((url) => {
				resolve(url)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export default class PostImageEdit extends Component {
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
		}
	}

	// send post info and photo uris to database
	updatePost() {
		if (this.state.hasUploaded == true
			&& this.state.imgURL1.substring(0, 7) != "content"
			&& this.state.imgURL2.substring(0, 7) != "content"
			&& this.state.imgURL3.substring(0, 7) != "content") {
				Alert.alert("updatePost: " + " : " + this.state.PhotoOne + " :" + this.state.PhotoTwo + " :" + this.state.PhotoThree)
				fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=updatePost', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						UserID: this.state.userID,
						EventID: this.state.eventID,
						PostID: this.state.postID,
						title: this.state.title,
						description: this.state.story.substring(0, 30) + "...",
						PostText: this.state.story,
						PhotoOne: this.state.imgURL1.toString(),
						PhotoTwo: this.state.imgURL2.toString(),
						PhotoThree: this.state.imgURL3.toString()
					})
				}).then((response) => response.json())
				.then((responseJson) => {
					// If server response message same as Data Matched
					if (responseJson.isValid === 'valid') {
					
						Alert.alert("Post Updated!");
						this.props.navigation.navigate('Event', {eventID: this.state.eventID})

					}
					else {
						Alert.alert(responseJson);
					}
				}).catch((error) => {
					console.error(error);
				});
		}
	}

	// image picker
	_pickImage() {
		if (this.state.size == 3) {
			alert("Maximum nuber of images selected.");
		}
		else if (this.state.imgURL1 == "-") {
			console.log("I'm trying to pick an image");
			ImagePicker.launchImageLibrary({}, response => {
				this.setState({ imgURL1: response.uri });
			})
			this.setState({ size: 1 })
		}
		else if (this.state.imgURL2 == "-") {
			console.log("I'm trying to pick an image");
			ImagePicker.launchImageLibrary({}, response => {
				this.setState({ imgURL2: response.uri });
			})
			this.setState({ size: 2 })
		}
		else if (this.state.imgURL3 == "-") {
			console.log("I'm trying to pick an image");
			ImagePicker.launchImageLibrary({}, response => {
				this.setState({ imgURL3: response.uri });
			})
			this.setState({ size: 3 })
		};
	}

	//uploads images to firebase
	addImages() {
		var imagehere = "";
		if (this.state.size == 0) {
			Alert.alert("You have no images to upload.");
		}
		else if (this.state.size == 3 && this.state.imgURL1 != "-") {
			uploadImage(this.state.imgURL1)
				.then(url => this.setState({ imgURL1: url }))
				.catch(error => console.log(error));
			uploadImage(this.state.imgURL2)
				.then(url => this.setState({ imgURL2: url }))
				.catch(error => console.log(error));
			uploadImage(this.state.imgURL3)
				.then(url => this.setState({ imgURL3: url }))
				.catch(error => console.log(error));
			this.setState({ hasUploaded: true })
		}
		else if (this.state.size == 2 && this.state.imgURL1 != "-") {
			uploadImage(this.state.imgURL1)
				.then(url => this.setState({ imgURL1: url }))
				.catch(error => console.log(error));
			uploadImage(this.state.imgURL2)
				.then(url => this.setState({ imgURL2: url }))
				.catch(error => console.log(error));
			this.setState({ hasUploaded: true })
		}
		else if (this.state.size == 1 && this.state.imgURL1 != "-") {
			uploadImage(this.state.imgURL1)
				.then(url => this.setState({ imgURL1: url }))
				.catch(error => console.log(error));
			this.setState({ hasUploaded: true })
		}
		else {
			alert("didn't upload for some reason!")
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
		const TITLE = params.title ? params.title : 0;
		const POSTID = params.postID ? params.postID : 0;
		this.setState({eventID: EVENTID});
		this.setState({userID: USERID});
		this.setState({story: STORY});
		this.setState({title: TITLE});
		this.setState({postID: POSTID});
	}

	//##############################################################

	render() {
		var words = this.state.story;
		return (
			<View style={styles.container}>
				{
					(() => {
						switch (this.state.size) {
							case 0:
								if(!this.state.hasUploaded){
									this.setState({ hasUploaded: true })
								}
								return (
									<Text>No Images</Text>
								)
							case 3:
								return (
									<ScrollView>
										<Image
											source={{ uri: this.state.imgURL1 }}
											style={styles.image}
										/>

										<Image
											source={{ uri: this.state.imgURL2 }}
											style={styles.image}
										/>
										
										<Image
											source={{ uri: this.state.imgURL3 }}
											style={styles.image}
										/>
										
									</ScrollView>
								)
							case 2:
								return (
									<ScrollView>
										<Image
											source={{ uri: this.state.imgURL1 }}
											style={styles.image}
										/>
										
										<Image
											source={{ uri: this.state.imgURL2 }}
											style={styles.image}
										/>
										
									</ScrollView>
								)
							default:
								return (
									<ScrollView>
										<Image
											source={{ uri: this.state.imgURL1 }}
											style={styles.image}
										/>
										
									</ScrollView>
								)
						}
					})()
				}
				<ScrollView>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<TouchableOpacity onPress={() => this._pickImage()}>
							<Text style={styles.upload}>
								Pick Image
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.addImages()}>
							<Text style={styles.upload}>
								Confirm
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => this.updatePost()}>
						<Text style={styles.upload}>
							Post
			  			</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 5,
		paddingLeft: 5,
	},
	image: {
		height: 200,
		resizeMode: 'contain',
	},
	upload: {
		textAlign: 'center',
		color: '#333333',
		padding: 10,
		marginBottom: 5,
		borderWidth: 1,
		borderColor: 'gray'
	},
})