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

export default class personalInfoSettings extends Component {

    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
    }

    onValueChange(value){
        this.setState({switchValue: value});
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
				}
				else {
					Alert.alert(responseJson);
				}
			}).catch((error) => {
				console.error(error);
			});
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

				firstName: this.state.firstName,
				lastName:  this.state.lastName,
				dateOfBirth: this.state.dateOfBirth,
				employerName: this.state.employerName,
				aboutMe: this.state.aboutMe,
				currentCity: this.state.currentCity,
				currentStateOrProvence: this.state.currentStateOrProvence,
				currentCountry: this.state.currentCountry,
				cellPhone: this.state.cellPhone,
				homePhone: this.state.homePhone,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					Alert.alert(responseJson);
				}
				else {
					Alert.alert(responseJson);
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

		const { params } = this.props.navigation.state;
		const firstName = params.firstName ? params.firstName : "null";
		const lastName = params.lastName ? params.lastName : "null";
		const dateOfBirth = params.dateOfBirth ? params.dateOfBirth : "null";
		const employerName = params.employerName ? params.employerName : "null";
        const aboutMe = params.aboutMe ? params.aboutMe : "null";
		const currentCity = params.currentCity ? params.currentCity : "null";
		const currentCountry = params.currentCountry ? params.currentCountry : "null";
		const currentStateOrProvence = params.currentStateOrProvence ? params.currentStateOrProvence : "null";
		const cellPhone = params.cellPhone ? params.cellPhone : "null";
		const homePhone = params.homePhone ? params.homePhone : "null";
		const dateAdded = params.dateAdded ? params.dateAdded : "null";
		this.setState({"firstName": firstName});
		this.setState({"lastName": lastName});
		this.setState({"dateOfBirth": dateOfBirth});
		this.setState({"employerName": employerName});
		this.setState({"aboutMe": aboutMe});
		this.setState({"currentCity": currentCity});
		this.setState({"currentStateOrProvence": currentStateOrProvence});
		this.setState({"currentCountry": currentCountry});
		this.setState({"cellPhone": cellPhone});
		this.setState({"homePhone": homePhone});
		this.setState({"dateAdded": dateAdded});
	}

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header/>

                <SettingsList.Item
								id="firstName"
								title='First Name'
								isEditable={true}
								value={this.state.firstName}
								onTextChange={(text) => this.setState({ "firstName": text })}
							/>
							<SettingsList.Item
								id="lastName"
								title='Last Name'
								isEditable={true}
								value={this.state.lastName}
								onTextChange={(text) => this.setState({ "lastName": text })}
							/>
							<SettingsList.Item
								id="dateOfBirth"
								title='Date of Birth'
								isEditable={true}
								value={this.state.dateOfBirth}
								onTextChange={(text) => this.setState({ "dateOfBirth": text })}
							/>
							<SettingsList.Item
								id="employerName"
								title='Employer Name'
								isEditable={true}
								value={this.state.employerName}
								onTextChange={(text) => this.setState({ "employerName": text })}
							/>
							<SettingsList.Item
								id="aboutMe"
								title='About Me'
								isEditable={true}
								value={this.state.aboutMe}
								onTextChange={(text) => this.setState({ "aboutMe": text })}
							/>
							<SettingsList.Item
								id="currentCity"
								title='Current City'
								isEditable={true}
								value={this.state.currentCity}
								onTextChange={(text) => this.setState({ "currentCity": text })}
							/>
							<SettingsList.Item
								id="currentStateOrProvince"
								title='Current State or Province'
								isEditable={true}
								value={this.state.currentStateOrProvence}
								onTextChange={(text) => this.setState({ "currentStateOrProvence": text })}
							/>
							<SettingsList.Item
								id="currentCountry"
								title='Current Country'
								isEditable={true}
								value={this.state.currentCountry}
								onTextChange={(text) => this.setState({ "currentCountry": text })}
							/>
							<SettingsList.Item
								id="cellPhone"
								title='Cell Phone'
								isEditable={true}
								value={this.state.cellPhone}
								onTextChange={(text) => this.setState({ "cellPhone": text })}
							/>
							<SettingsList.Item
								id="homePhone"
								title='Home Phone'
								isEditable={true}
								value={this.state.homePhone}
								onTextChange={(text) => this.setState({ "homePhone": text })}
							/>
            </SettingsList>
			<Text>{this.state.aboutMe}</Text>
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
				onPress={() => this.UpdateUserInformation()}
			/>
            </View>
        </View>
        );
    }
}