import {StyleSheet} from 'react-native';

module.exports =  styles = StyleSheet.create({	
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