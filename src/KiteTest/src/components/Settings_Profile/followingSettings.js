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

export default class followingSettings extends Component {

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
        const numOfFollowers = params ? params.numOfFollowers : null;
        const numOfFollowing = params ? params.numOfFollowing : null;
        this.setState({"numOfFollowers": numOfFollowers});
        this.setState({"numOfFollowing": numOfFollowing});
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
                title='Followers & Following'
                onPress={() => Alert.alert('Route To Do Not Disturb Page')}
                />
            </SettingsList>
            </View>
        </View>
        );
    }
}