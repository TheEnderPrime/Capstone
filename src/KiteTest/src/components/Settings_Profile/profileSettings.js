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

export default class profileSettings extends Component {

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
                title='Airplane Mode'
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Wi-Fi'
                titleInfo='Bill Wi The Science Fi'
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Route to Wifi Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Blutooth'
                titleInfo='Off'
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Route to Blutooth Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Cellular'
                onPress={() => Alert.alert('Route To Cellular Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Personal Hotspot'
                titleInfo='Off'
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Route To Hotspot Page')}
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Notifications'
                onPress={() => Alert.alert('Route To Notifications Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Control Center'
                onPress={() => Alert.alert('Route To Control Center Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Do Not Disturb'
                onPress={() => Alert.alert('Route To Do Not Disturb Page')}
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='General'
                onPress={() => Alert.alert('Route To General Page')}
                />
                <SettingsList.Item
                icon={<Image style={styles.imageStyle} source={require('../../images/placeholderProfilePicture.jpg')}/>}
                title='Display & Brightness'
                onPress={() => Alert.alert('Route To Display Page')}
                />
            </SettingsList>
            </View>
        </View>
        );
    }
}