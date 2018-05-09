import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	AppRegistry,
	Image,
    Alert,
	AsyncStorage,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import styles from './styles';

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

export default class communityPictureSettings extends Component {

    constructor(props) {
        super(props);

        this.onValueChange = this.onValueChange.bind(this);
        
        this.state = {
            switchValue: false,
            size: 0,
			hasUploaded: false,
			imgURL1: "-",
			communityID: 0,
        };
    }

	UpdateCommunity = () => {
		if (this.state.hasUploaded == true && this.state.imgURL1.substring(0, 7) != "content") {
			Alert.alert(this.state.imgURL1);
			var image = this.state.imgURL1.toString();
			fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=updateCommunity', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
			
					CommunityID: this.state.communityID,
			
					ProfilePicture: image,

					UserID: this.state.userID,
			
				})
			})
		}
    }

	_pickImage() {
		if (this.state.size == 1) {
			alert("Maximum number of images selected.");
		}
		else {
			console.log("I'm trying to pick an image");
			ImagePicker.launchImageLibrary({}, response => {
				this.setState({ imgURL1: response.uri });
			})
			this.setState({ size: 1 })
		}
	}

	addImages() {
		var imagehere = "";
		if (this.state.size == 0) {
			alert("You have no images to upload.")
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

    onValueChange(value){
        this.setState({switchValue: value});
    }
    
    setCommunityIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

    async componentWillMount() {
		const community = await AsyncStorage.getItem('communityIDSettings')
		await this.setCommunityIdAsync({communityID: community});
		const USERID = await AsyncStorage.getItem('userID');
		await this.setCommunityIdAsync({userID: USERID});
    }

    render() {
        return (
        
            <View style={styles.container}>
            {
                (() => {
                    switch (this.state.size) {
                        case 0:
                            return null
                        default:
                            this.UpdateCommunity();
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
                        Update Community
                      </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
            
    //         <Button
	// 			title='Apply'
	// 			// icon={
	// 			// 	<Icon
	// 			// 	name='create'
	// 			// 	size={15}
	// 			// 	color='white'
	// 			// 	/>
	// 			// }
	// 			buttonStyle={{
	// 				backgroundColor: "rgba(92, 99,216, 1)",
	// 				width: 80,
	// 				height: 40,
	// 				borderColor: "transparent",
	// 				borderWidth: 0,
	// 				borderRadius: 5
	// 			}}
	// 			onPress={() => Alert.alert('FETCH CALL HERE TO UPDATE DATABASE WITH NEW INFORMATION')}
	// 		/>
        );
    }
}