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

class Settings extends React.Component {

	constructor() {
		super();
		this.onValueChange = this.onValueChange.bind(this);
		this.state = { 
			switchValue: false, 
			stages: 20,
			firstName: "FIRST NAME",
			lastName: "LAST NAME",
			email: "EMAIL",
			dateOfBirth: "12/25/00",
			profilePic: '../../images/placeholderProfilePicture.jpg',
			employerName: "EMPLOYER NAME",
			aboutMe: "ABOUT ME",
			currentCity: "CURRENT CITY",
			currentStateOrProvence: "CURRENT STATE OR PROVENCE",
			currentCountry: "CURRENT COUNTRY",
			cellPhone: 0,
			homePhone: 0, 
		};
	}

	componentDidMount() {
		//set all current text boxes with data from the Database
	}

	componentWillUnmount() {
		//send changes from state to Database with PHP
	}

	render() {
		return (
			<View style={{ backgroundColor: 'gray', flex: 1 }}>
				<View style={{ flex: 1, marginTop: 10 }}>
					<SettingsList>

			{/* PERSONAL INFO */}
						<SettingsList.Header headerText='Personal Information' headerStyle={{ color: 'white' }} />
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
								id="email"
								title='Email'
								isEditable={true}
								value={this.state.email.toString()}
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
			{/* PRIVACY SETTINGS */}			
						<SettingsList.Header headerText='Privacy Settings' headerStyle={{ color: 'white', marginTop: 20 }} />
							
			{/* LOGIN SETTINGS */}				
						<SettingsList.Header headerText='Login Settings' headerStyle={{ color: 'white', marginTop: 20 }} />
						<SettingsList.Item
								id="cellPhone"
								title='Change Password'
								isEditable={true}
								value={this.state.cellPhone.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>

			{/* FOLLOWIN AND FOLLOWERS SETTINGS */}
						<SettingsList.Header headerText='Following and Followers Settings' headerStyle={{ color: 'white', marginTop: 20 }} />
							<SettingsList.Item titleInfo='Some Information' hasNavArrow={false} title='Information Example' />
							<SettingsList.Item title='Settings 1' />
							<SettingsList.Item title='Settings 2' />
							<SettingsList.Item
								id="stages"
								title='stages'
								isEditable={true}
								value={this.state.stages.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>	
							
			{/* COMMUNITIES SETTINGS */}				
						<SettingsList.Header headerText='Communities Settings' headerStyle={{ color: 'white', marginTop: 20 }} />
							<SettingsList.Item titleInfo='Some Information' hasNavArrow={false} title='Information Example' />
							<SettingsList.Item title='Settings 1' />
							<SettingsList.Item title='Settings 2' />
							<SettingsList.Item
								id="stages"
								title='stages'
								isEditable={true}
								value={this.state.stages.toString()}
								onTextChange={(text) => this.setState({ stages: text })}
							/>	
					</SettingsList>


				</View>
			</View>
		);
	}
	onValueChange(value) {
		this.setState({ switchValue: value });
	}
}



export default Settings;