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

export default class emailSettings extends Component {

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
    const email = params ? params.email : "null";
    this.setState({"email": email});
    }

    render() {
        var bgColor = '#DCE3F4';
        return (
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
            <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>    
                <SettingsList.Item
					id="email"
					title='Email'
					isEditable={true}
					value={this.state.email.toString()}
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