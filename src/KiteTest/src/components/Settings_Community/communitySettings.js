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

export default class communitySettings extends Component {

    constructor(){
        super();
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {switchValue: false};
    }

    onValueChange(value){
        this.setState({switchValue: value});
    }

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
            <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
            </View>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                icon={
                    <Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>
                }
                hasSwitch={true}
                switchState={this.state.switchValue}
                switchOnValueChange={this.onValueChange}
                hasNavArrow={false}
                title='Who Can Join'
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Who Can See'
                titleInfo='Bill Wi The Science Fi'
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Route to Wifi Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Admins'
                titleInfo='Off'
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Route to Blutooth Page')}
                />
            </SettingsList>
            </View>
        </View>
        );
    }
}