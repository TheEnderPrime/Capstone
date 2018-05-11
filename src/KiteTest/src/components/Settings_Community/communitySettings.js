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
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import styles from './styles';

export default class communitySettings extends Component {

    constructor(){
        super();
        
        this.state = {switchValue: false};
    }

    onValueChange(value){
        this.setState({switchValue: value});
    }

    // loads community info which will be sent to the other settings pages instead of calling getCommunity in each page
    getCommunity = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=getCommunity', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				CommunityID: this.state.communityID,
				
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					this.setState({"title": responseJson.community.Title});
					this.setState({"aboutUs": responseJson.community.AboutUs});
					this.setState({"ProfilePicture": responseJson.community.ProfilePicture});
					this.setState({"adminID": responseJson.community.adminID});
				}
				else {
					Alert.alert(responseJson.error);
				}
			}).catch((error) => {
				console.error(error);
			});
	}

    setCommunityIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

    // gets communityID
    async componentWillMount() {
		const community = await AsyncStorage.getItem('communityIDSettings')
        await this.setCommunityIdAsync({communityID: community});
		if(this.state.communityID != null){
            this.getCommunity();
		}
  	}

    render() {
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                
                <SettingsList.Header/>
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Community Profile Picture'
                    onPress={() =>this.props.navigation.navigate('CommunityPictureSettings')}
                />
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Community Information'
                    onPress={() => this.props.navigation.navigate('CommunityInfoSettings', 
                        {
                            title: this.state.title, 
                            aboutUs: this.state.aboutUs, 
                            adminID: this.state.adminID, 
                        })}
                />
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Community Followers'
                    onPress={() => this.props.navigation.navigate('FollowerSettings', {numOfFollowers: this.state.numOfFollowers, numOfFollowing: this.state.numOfFollowing})} //Need numbers to be sent, do it in FollowingSettings???
                />
            </SettingsList>
            </View>
        </View>
        );
    }
}