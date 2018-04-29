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

export default class followingSettings extends Component {

    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
    }

    onValueChange(value){
        this.setState({switchValue: value});
    }
	
	UpdateUserInformation = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/User.php?f=updateProfile', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				UserID: this.state.userID,

				email: this.state.email,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					Alert.alert("Settings Updated");
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

    async componentDidMount() {
        const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		
        const { params } = this.props.navigation.state;
        const numOfFollowers = params.numOfFollowers ? params.numOfFollowers : "null";
        const numOfFollowing = params.numOfFollowing ? params.numOfFollowing : "null";
        this.setState({"numOfFollowers": numOfFollowers});
        this.setState({"numOfFollowing": numOfFollowing});
    }

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <Text>Your Followers: {this.state.numOfFollowers}</Text>
            <Text>You are Following: {this.state.numOfFollowing}</Text>
                <SettingsList.Header/>
                
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Followers & Following'
                onPress={() => Alert.alert('Display Followers and Following Here.')}
                />
            </SettingsList>
            <Button
				title='Apply'
				// icon={
				// 	<Icon
				// 	name='create'
				// 	size={15}
				// 	color='white'
				// 	/>
				// }
				buttonStyle={{
					backgroundColor: "rgba(92, 99,216, 1)",
					width: 80,
					height: 40,
					borderColor: "transparent",
					borderWidth: 0,
					borderRadius: 5
				}}
				onPress={() => Alert.alert('FETCH CALL HERE TO UPDATE DATABASE WITH NEW INFORMATION')}
			/>
            </View>
        </View>
        );
    }
}