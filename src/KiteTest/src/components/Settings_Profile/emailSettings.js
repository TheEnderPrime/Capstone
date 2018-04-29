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

export default class emailSettings extends Component {

    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
			switchValue: false,
			email: "inital",
		}
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
					Alert.alert("Email Updated");
				}
				else {
					Alert.alert(responseJson.errorMessage);
				}
			}).catch((error) => {
				console.error(error);
			});
	}

    onValueChange(value){
        this.setState({switchValue: value});
	}
	
	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

    async componentDidMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		const { params } = this.props.navigation.state;
		const EMAIL = params ? params.email : "null";
		this.setState({"email": EMAIL});
    }

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>    
                <SettingsList.Item
					id="email"
					title='Email'
					isEditable={true}
					value={this.state.email.toString()}
					onTextChange={(text) => this.setState({ "email": text })}
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
				onPress={() => {this.UpdateUserInformation()}}//				Alert.alert("This is dumb")}			
			/>
            </View>
        </View>
        );
    }
}