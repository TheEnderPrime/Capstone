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
        this.state = {
			switchValue: false,
			firstName: "loading",
			lastName: "loading",
			email: "loading",
			dateOfBirth: "loading",
			employerName: "loading",
			aboutMe: "loading",
			currentCity: "loading",
			currentStateOrProvence: "loading",
			currentCountry: "loading",
			cellPhone: "loading",
			homePhone: "loading",
		};
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

				FirstName: this.state.firstName,

				LastName:  this.state.lastName,
				
				DateOfBirth: this.state.dateOfBirth,
				
				EmployerName: this.state.employerName,
				
				AboutMe: this.state.aboutMe,
				
				CurrentCity: this.state.currentCity,
				
				CurrentStateOrProvence: this.state.currentStateOrProvence,
				
				CurrentCountry: this.state.currentCountry,
				
				CellPhone: this.state.cellPhone,
				
				HomePhone: this.state.homePhone,
		
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					Alert.alert("User Info Updated!");
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

		const { params } = this.props.navigation.state;
		const FirstName = params.firstName ? params.firstName : "";
		const LastName = params.lastName ? params.lastName : "";
		const DateOfBirth = params.dateOfBirth ? params.dateOfBirth : "";
		const EmployerName = params.employerName ? params.employerName : "";
        const AboutMe = params.aboutMe ? params.aboutMe : "";
		const CurrentCity = params.currentCity ? params.currentCity : "";
		const CurrentCountry = params.currentCountry ? params.currentCountry : "";
		const CurrentStateOrProvence = params.currentStateOrProvence ? params.currentStateOrProvence : "";
		const CellPhone = params.cellPhone ? params.cellPhone : "";
		const HomePhone = params.homePhone ? params.homePhone : "";
		this.setState({"firstName": FirstName});
		this.setState({"lastName": LastName});
		this.setState({"dateOfBirth": DateOfBirth});
		this.setState({"employerName": EmployerName});
		this.setState({"aboutMe": AboutMe});
		this.setState({"currentCity": CurrentCity});
		this.setState({"currentStateOrProvence": CurrentStateOrProvence});
		this.setState({"currentCountry": CurrentCountry});
		this.setState({"cellPhone": CellPhone});
		this.setState({"homePhone": HomePhone});
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
					onTextChange={(text) => this.setState({ "firstName": text })}
				/>
				<SettingsList.Item
					id="lastName"
					title='Last Name'
					isEditable={true}
					value={this.state.lastName.toString()}
					onTextChange={(text) => this.setState({ "lastName": text })}
				/>
				<SettingsList.Item
					id="dateOfBirth"
					title='Date of Birth'
					isEditable={true}
					value={this.state.dateOfBirth.toString()}
					onTextChange={(text) => this.setState({ "dateOfBirth": text })}
				/>
				<SettingsList.Item
					id="employerName"
					title='Employer Name'
					isEditable={true}
					value={this.state.employerName.toString()}
					onTextChange={(text) => this.setState({ "employerName": text })}
				/>
				<SettingsList.Item
					id="aboutMe"
					title='About Me'
					isEditable={true}
					value={this.state.aboutMe.toString()}
					onTextChange={(text) => this.setState({ "aboutMe": text })}
				/>
				<SettingsList.Item
					id="currentCity"
					title='Current City'
					isEditable={true}
					value={this.state.currentCity.toString()}
					onTextChange={(text) => this.setState({ "currentCity": text })}
				/>
				<SettingsList.Item
					id="currentStateOrProvince"
					title='Current State or Province'
					isEditable={true}
					value={this.state.currentStateOrProvence.toString()}
					onTextChange={(text) => this.setState({ "currentStateOrProvence": text })}
				/>
				<SettingsList.Item
					id="currentCountry"
					title='Current Country'
					isEditable={true}
					value={this.state.currentCountry.toString()}
					onTextChange={(text) => this.setState({ "currentCountry": text })}
				/>
				<SettingsList.Item
					id="cellPhone"
					title='Cell Phone'
					isEditable={true}
					value={this.state.cellPhone.toString()}
					onTextChange={(text) => this.setState({ "cellPhone": text })}
				/>
				<SettingsList.Item
					id="homePhone"
					title='Home Phone'
					isEditable={true}
					value={this.state.homePhone.toString()}
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