import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
  	},
  	profileDesc: { 
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
	}, 
	profilePicture: {
		flex: 1,
		fontSize: 20,
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
	},
	profileWords: {
		flex: 1,
		fontSize: 10, 
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
	},
	buttonsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
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
	postsContainer:{
		flex: 1,
		fontSize: 10, 
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
	},
});