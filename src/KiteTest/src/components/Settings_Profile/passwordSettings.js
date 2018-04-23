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

export default class passwordSettings extends Component {

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
        const password = params ? params.password : null;
        this.setState({"password": password});
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
                title='Password'
                titleInfo=''
                titleInfoStyle={styles.titleInfoStyle}
                onPress={() => Alert.alert('Route to Password Page')}
                />
                <SettingsList.Header headerStyle={{marginTop:15}}/>
                <SettingsList.Item
								id="firstName"
								title='First Name'
								isEditable={true}
								value={"this.state.firstName.toString()"}
								onTextChange={(text) => this.setState({ stages: text })}
							/>
            </SettingsList>
            </View>
        </View>
        );
    }
}