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
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
    }

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
		if(this.state.communityID != null){
            this.getCommunity();
		}
  	}

    render() {
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Item
                icon={
                    <Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>
                }
                hasSwitch={true}
                switchState={this.state.switchValue}
                switchOnValueChange={this.onValueChange}
                hasNavArrow={false}
                title='Privacy - Visible?'
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Admins'
                titleInfo='Off'
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Admins Only')}
                />
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
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Delete Community'
                    onPress={() => Alert.alert("Profile Deleted")}
                />
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Disable Community'
                    onPress={() => Alert.alert("Profile Disabled")} //Need numbers to be sent, do it in FollowingSettings???
                />
            </SettingsList>
            </View>
        </View>
        );
    }
}