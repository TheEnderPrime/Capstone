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

class Profile extends React.Component {

	static propTypes = {
        //: PropTypes.object.isRequired,
        //: PropTypes.func.isRequired,
    };

    state = {
        //deal: this.props.initialDealData,
        //imageIndex: 0,
    };

  render() {
    return (
    	<View style={styles.container}>
	  		<View style={styles.topBar}>
				<View style={styles.hamburgerMenu}>
					<Text>Hamburger Menu</Text>
				</View>
				<View style={styles.logo}>
					<Text>Kite Logo</Text>
				</View>
				<View style={styles.searchBar}>
					<Text>Search Bar</Text>
				</View>
			</View>
			
			<View style={styles.middleBar}>
								
			</View>
    	</View>

    );
  }
}



  export default Profile;