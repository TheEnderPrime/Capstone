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

class lowerMenu extends React.Component {

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

  export default lowerMenu;