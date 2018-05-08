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

export default class communityInfoSettings extends Component {

    constructor() {
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
			switchValue: false,
			title: "loading",
			aboutUs: "loading",
		
		};
    }

    onValueChange(value){
        this.setState({switchValue: value});
	}
	
	UpdateCommunityInformation = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/Communities.php?f=updateCommunity', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
		
				CommunityID: this.state.communityID,

				Title: this.state.title,

				AboutUs:  this.state.aboutUs,
				
			})
		}).then((response) => response.json())
			.then((responseJson) => {
				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {
					Alert.alert("Community Information Updated!");
				}
				else {
					Alert.alert(responseJson.errorMessage);
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

    async componentWillMount() {
		const community = await AsyncStorage.getItem('communityIDSettings')
        await this.setCommunityIdAsync({communityID: community});

		const { params } = this.props.navigation.state;
		const Title = params.title ? params.title : "";
		const AboutUs = params.aboutUs ? params.aboutUs : "";
		const AdminID = params.adminID ? params.adminID : "";
		this.setState({"title": Title});
		this.setState({"AboutUs": AboutUs});
		this.setState({"adminID": AdminID});
	}

    render() {
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header/>
                <SettingsList.Item
					id="title"
					title='Community Title'
					isEditable={true}
					value={this.state.title.toString()}
					onTextChange={(text) => this.setState({ "title": text })}
				/>
				<SettingsList.Item
					id="aboutUs"
					title='Community Description'
					isEditable={true}
					value={this.state.aboutUs.toString()}
					onTextChange={(text) => this.setState({ "aboutUs": text })}
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
				onPress={() => this.UpdateCommunityInformation()}
			/>
            </View>
        </View>
        );
    }
}