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
			
			<View style={styles.bottomBar}>
				
			<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Timeline"
					color='#277552'
					accessibilityLabel="Timeline Things"
				>

				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Events"
					color='#277552'
					accessibilityLabel="Events Amoung Other Things ;)"
				>
				
				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Posts"
					color='#277552'
					accessibilityLabel="A Mild Host of Posts Here"
				>
				
				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Notifications"
					color='#277552'
					accessibilityLabel="A Notification of Notifications"
				>
				
				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Profile"
					color='#277552'
					accessibilityLabel="Here Lies My Profile"
				>
				
				</Button> 
			</View>
    	</View>

    );
  }
}



  export default Profile;

  /*<View style={styles.logo}>
				<Text style={styles.logoText}>Kite</Text>
			</View>
			<View style={styles.welcome}>
				<Text style={styles.welcomeWords}>Welcome to the Kite App!</Text>
			</View>
			<View style={styles.selectionBox}>
				<Text style={styles.selections}>Sign In</Text>
				<Text style={styles.selections}>Sign Up</Text>
			</View>
			<View style={styles.loginBox}>
				<View style={styles.button}>
					<Button title="Log In" onPress={() => {}} />
				</View>
				<View style={styles.button}>
					<Button title="Sign Up" onPress={() => {}} />
				</View>
				<TouchableOpacity onPress={() => {}}> 
        			<Text style={styles.forgotPassword}> Forgot Password?</Text>
          		</TouchableOpacity>
				
			</View>
	*/