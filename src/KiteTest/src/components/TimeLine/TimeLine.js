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

//import BasicFront from '../BasicFrontScreen/BasicFront';

class TimeLine extends React.Component {

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
					color='purple'
					accessibilityLabel="Timeline Things"
				>

				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Events"
					color='purple'
					accessibilityLabel="Events Amoung Other Things ;)"
				>
				
				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Posts"
					color='purple'
					accessibilityLabel="A Mild Host of Posts Here"
				>
				
				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Notifications"
					color='purple'
					accessibilityLabel="A Notification of Notifications"
				>
				
				</Button>
				<Button 
					onPress={()=>{}}
					style={styles.buttonSelected}
					title="Profile"
					color='purple'
					accessibilityLabel="Here Lies My Profile"
				>
				
				</Button>
			</View>
    	</View>

		/* This is how to add a different function like a search bar with code in a different file into here.
		<View style={styles.main}>
          <SearchBar 
            searchDeals={this.searchDeals} 
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
		*/
    );
  }
}

const styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#0848af',
  	},
  	topBar: {
		// Contains the dropdown menu, logo, and search functionality
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 26,
	},
	hamburgerMenu: {
		//eventually will be styled in its own function file
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	logo: {
		//eventually will be styled in its own function file
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	searchBar: {
		//eventually style this in the SearchBar.js file where its code will be located  
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
  	middleBar: { 
		//will contain the timeline with all of its thingimabobs
  	}, 
  	bottomBar: { 
		//will contain the menu to change the page contained in the middleBar
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		padding: 26,
  	},
  	buttonUnselected: {
		//will be a bit LIGHTER to show that it IS NOT selected at that time
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		fontSize: 10,
	},
	buttonSelected: {
		//will be a bit DARKER to show that it IS selected at that time
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		fontSize: 10,
	},
});

  export default TimeLine;

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