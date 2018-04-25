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

				email: this.state.email,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					Alert.alert("Email Updated");
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
								value={this.state.firstName.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="lastName"
								title='Last Name'
								isEditable={true}
								value={this.state.lastName.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="dateOfBirth"
								title='Date of Birth'
								isEditable={true}
								value={this.state.dateOfBirth.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="employerName"
								title='Employer Name'
								isEditable={true}
								value={this.state.employerName.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="aboutMe"
								title='About Me'
								isEditable={true}
								value={this.state.aboutMe.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="currentCity"
								title='Current City'
								isEditable={true}
								value={this.state.currentCity.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="currentStateOrProvince"
								title='Current State or Province'
								isEditable={true}
								value={this.state.currentStateOrProvence.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="currentCountry"
								title='Current Country'
								isEditable={true}
								value={this.state.currentCountry.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="cellPhone"
								title='Cell Phone'
								isEditable={true}
								value={this.state.cellPhone.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="homePhone"
								title='Home Phone'
								isEditable={true}
								value={this.state.homePhone.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
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