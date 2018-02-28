import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

class Settings extends React.Component {

	static propTypes = {
        //: PropTypes.object.isRequired,
        //: PropTypes.func.isRequired,
    };

    state = {
        //deal: this.props.initialDealData,
        //imageIndex: 0,
    };

  render() {
      const {navigate} = this.props.navigation;
    return (
    	<View style={styles.container}>
            <View style={styles.settingsBlock}>
                <TouchableOpacity onPress={() => navigate('PersonalInfoSettings')}>
                    <Text style={styles.header}>Personal Information</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={styles.settingsBlock}>

                <TouchableOpacity onPress={() => navigate('LoginSettings')}>
                    <Text style={styles.header}>Logging In</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={styles.settingsBlock}>

                <TouchableOpacity onPress={() => navigate('FollowSettings')}>
                    <Text style={styles.header}>Following and Followers</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={styles.settingsBlock}>

                <TouchableOpacity onPress={() => navigate('PrivacySettings')}>
                    <Text style={styles.header}>Privacy</Text>
                </TouchableOpacity>

            </View>
            
            <View style={styles.settingsBlock}>

                <TouchableOpacity onPress={() => navigate('CommunitiesSettings')}>
                    <Text style={styles.header}>Communities</Text>
                </TouchableOpacity>

            </View>
                
    	</View>

    );
  }
}



  export default Settings;