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

export default class profileSettings extends Component {

    constructor() {
        super();

        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            switchValue: false,
        };
    }

    UpdateUserInformation = (activeFlag, apples) => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=updateProfile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				UserID: this.state.userID,

                ActiveFlag: activeFlag,
                
                delete: apples,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
                    if(apples == "delete") {
                        Alert.alert("Profile Deleted. Hope you meant to do that.");
                    } else {
                        Alert.alert("Profile Disabled. Toggle again to allow others to view you again.");
                    }
                    
				}
				else {
					Alert.alert(responseJson.errorMessage);
				}
			}).catch((error) => {
				console.error(error);
			});
	}

    GatherUserInformation = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=getProfile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				UserID: this.state.userID,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					this.setState({"firstName": responseJson.firstName});
					this.setState({"lastName": responseJson.lastName});
					this.setState({"email": responseJson.email});
					this.setState({"dateOfBirth": responseJson.dateOfBirth});
					this.setState({"employerName": responseJson.employerName});
					this.setState({"aboutMe": responseJson.aboutMe});
					this.setState({"currentCity": responseJson.currentCity});
					this.setState({"currentStateOrProvence": responseJson.currentStateOrProvence});
					this.setState({"currentCountry": responseJson.currentCountry});
					this.setState({"cellPhone": responseJson.cellPhone});
					this.setState({"homePhone": responseJson.homePhone});
                    this.setState({"dateAdded": responseJson.dateAdded});
                    this.setState({"activeFlag": responseJson.activeFlag})
				}
				else {
					Alert.alert(responseJson.errorMessage);
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
		if(this.state.userID != null){
            this.GatherUserInformation(this.state.userID);
        }
        if(this.state.activeFlag == 1) {
            this.setState({switchValue: true})
        } else {
            this.setState({switchValue: false})
        }
    }
      
    onValueChange(value){
        this.setState({switchValue: value});
        if(!this.state.switchValue) {
            this.UpdateUserInformation(0, null);
        } else {
            this.UpdateUserInformation(1, null);
        }
    }

    // sends user information to the other profile settings pages
    render() {
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header/>
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Email'
                    onPress={() => this.props.navigation.navigate('EmailSettings', 
                        {
                            email: this.state.email
                        })}
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Profile Picture'
                    onPress={() =>this.props.navigation.navigate('ProfilePictureSettings', {})} //Need picture to be sent, do it in ProfilePictureSettings???
                />
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Personal Information'
                    onPress={() => this.props.navigation.navigate('PersonalInfoSettings', 
                        {
                            firstName: this.state.firstName, 
                            lastName: this.state.lastName, 
                            dateOfBirth: this.state.dateOfBirth, 
                            employerName: this.state.employerName, 
                            aboutMe: this.state.aboutMe, 
                            currentCity: this.state.currentCity, 
                            currentStateOrProvence: this.state.currentStateOrProvence, 
                            currentCountry: this.state.currentCountry, 
                            cellPhone: this.state.cellPhone, 
                            homePhone: this.state.homePhone, 
                            dateAdded: this.state.dateAdded
                        })}
                />
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Followers & Following'
                    onPress={() => this.props.navigation.navigate('FollowingSettings', {numOfFollowers: this.state.numOfFollowers, numOfFollowing: this.state.numOfFollowing})} //Need numbers to be sent, do it in FollowingSettings???
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                    icon={
                        <Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>
                    }
                    hasSwitch={true}
                    switchState={this.state.switchValue}
                    switchOnValueChange={this.onValueChange}
                    hasNavArrow={false}
                    title='Disable Profile'
                />
                <SettingsList.Item
                    icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                    title='Delete Profile'
                    onPress={() => this.UpdateUserInformation(1, "delete")} //Need numbers to be sent, do it in FollowingSettings???
                />
            </SettingsList>
            </View>
        </View>
        );
    }
}