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
	Alert
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import styles from './styles';

// import ImagePicker from 'react-native-image-picker'
// import RNFetchBlob from 'react-native-fetch-blob'
// import firebase from 'firebase'

// // Init Firebase
// const config = {
//   apiKey: "AIzaSyDpbDjvHHsLvdkOxwgSXohkVOErHMqPNWw",
//   authDomain: "kite-mobile.firebaseapp.com",
//   storageBucket: "kite-mobile.appspot.com",
// }
// firebase.initializeApp(config)
// const storage = firebase.storage()

// // Prepare Blob support
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

// const uploadImage = (uri, mime = 'application/octet-stream') => {
//   return new Promise((resolve, reject) => {
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//     const sessionId = new Date().getTime()
//     let uploadBlob = null
//     const imageRef = storage.ref('images').child(`${sessionId}`)

//     fs.readFile(uploadUri, 'base64')
//       .then((data) => {
//         return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//         uploadBlob = blob
//         return imageRef.put(blob, { contentType: mime })
//       })
//       .then(() => {
//         uploadBlob.close()
//         return imageRef.getDownloadURL()
//       })
//       .then((url) => {
//         resolve(url)
//       })
//       .catch((error) => {
//         reject(error)
//     })
//   })
// }

export default class profilePictureSettings extends Component {

    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
    }

    onValueChange(value){
        this.setState({switchValue: value});
    }

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Profile Picture'
                onPress={() => Alert.alert('Route To Notifications Page')}
                />
            </SettingsList>

            {/* <TouchableOpacity onPress={ () => this._pickImage() }>
                <Text style={ styles.upload }>
                    Upload
                </Text>
            </TouchableOpacity> */}
            </View>
        </View>
        );
    }
}