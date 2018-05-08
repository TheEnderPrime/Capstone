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
firebase.initializeApp(config);
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

class PostCreator extends React.Component {
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

	sendData() {

		if (this.state.hasUploaded == true
			&& this.state.imgURL1.substring(0, 7) != "content"
			&& this.state.imgURL2.substring(0, 7) != "content"
			&& this.state.imgURL3.substring(0, 7) != "content") {
			alert(this.state.imgURL1);
			var temp = this.state.imgURL1.toString();
			fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Post.php?f=createPost', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					UserID: 219575471,
					EventID: 132,
					Title: 'mmmm yes',
					Desc: 'Stuff',
					Story: 'Please work for me',
					PhotoOne: temp,
					PhotoTwo: this.state.imgURL2,
					PhotoThree: this.state.imgURL3
				}),
			});
		}
	}

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

	addImages() {
		var imagehere = "";
		if (this.state.size == 0) {
			alert("You have no images to upload.")
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

	//##############################################################

	render() {
		return (
			<View style={styles.container}>
				{
					(() => {
						switch (this.state.size) {
							case 0:
								return null
							case 3:
								this.sendData();
								return (
									<ScrollView>
										<Image
											source={{ uri: this.state.imgURL1 }}
											style={styles.image}
										/>
										<Text selectable={true}>{this.state.imgURL1}</Text>

										<Image
											source={{ uri: this.state.imgURL2 }}
											style={styles.image}
										/>
										<Text selectable={true}>{this.state.imgURL2}</Text>

										<Image
											source={{ uri: this.state.imgURL3 }}
											style={styles.image}
										/>
										<Text selectable={true}>{this.state.imgURL3}</Text>
									</ScrollView>
								)
							case 2:
								this.sendData();
								return (
									<ScrollView>
										<Image
											source={{ uri: this.state.imgURL1 }}
											style={styles.image}
										/>
										<Text selectable={true}>{this.state.imgURL1}</Text>

										<Image
											source={{ uri: this.state.imgURL2 }}
											style={styles.image}
										/>
										<Text selectable={true}>{this.state.imgURL2}</Text>
									</ScrollView>
								)
							default:
								this.sendData();
								return (
									<ScrollView>
										<Image
											source={{ uri: this.state.imgURL1 }}
											style={styles.image}
										/>
										<Text selectable={true}>{this.state.imgURL1}</Text>
									</ScrollView>
								)
						}
					})()
				}
				<ScrollView>
					<TouchableOpacity onPress={() => this._pickImage()}>
						<Text style={styles.upload}>
							Pick Image
			  			</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.addImages()}>
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


export default PostCreator;