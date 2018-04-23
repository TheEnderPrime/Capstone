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

	componentWillMount() {
		const { params } = this.props.navigation.state;
		const firstName = params ? params.firstName : null;
		const lastName = params ? params.lastName : null;
		const dateOfBirth = params ? params.dateOfBirth : null;
		const employerName = params ? params.employerName : null;
		const aboutMe = params ? params.aboutMe : null;
		const currentCity = params ? params.currentCity : null;
		const currentCountry = params ? params.currentCountry : null;
		const currentStateOrProvence = params ? params.currentStateOrProvence : null;
		const cellPhone = params ? params.cellPhone : null;
		const homePhone = params ? params.homePhone : null;
		const dateAdded = params ? params.dateAdded : null;
		this.setState({"firstName": responseJson.firstName});
		this.setState({"lastName": responseJson.lastName});
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

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Personal Information'
                onPress={() => Alert.alert('Route To Control Center Page')}
                />
                <SettingsList.Item
								id="firstName"
								title='First Name'
								isEditable={true}
								value={"this.state.firstName.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="lastName"
								title='Last Name'
								isEditable={true}
								value={"this.state.lastName.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="email"
								title='Email'
								isEditable={true}
								value={"this.state.email.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="dateOfBirth"
								title='Date of Birth'
								isEditable={true}
								value={"this.state.dateOfBirth.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="employerName"
								title='Employer Name'
								isEditable={true}
								value={"this.state.employerName.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="aboutMe"
								title='About Me'
								isEditable={true}
								value={"this.state.aboutMe.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="currentCity"
								title='Current City'
								isEditable={true}
								value={"this.state.currentCity.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="currentStateOrProvince"
								title='Current State or Province'
								isEditable={true}
								value={"this.state.currentStateOrProvence.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="currentCountry"
								title='Current Country'
								isEditable={true}
								value={"this.state.currentCountry.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="cellPhone"
								title='Cell Phone'
								isEditable={true}
								value={"this.state.cellPhone.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
							<SettingsList.Item
								id="homePhone"
								title='Home Phone'
								isEditable={true}
								value={"this.state.homePhone.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
            </SettingsList>
            </View>
        </View>
        );
    }
}