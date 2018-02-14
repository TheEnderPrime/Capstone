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
		padding: 15,
	}, 
	profilePicture: {
		flex: 1,
		width: 100,
		height: 160,
		justifyContent: 'space-around',
    	alignItems: 'center',
    	backgroundColor: '#A6CFBD',
	},
	profileText: {
		flex: 1,
		flexDirection: 'column', 
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
		backgroundColor: '#A6CFBD',
		padding: 15,
	},
	text: {
		flex: 1,
		fontSize: 15,
		flexDirection: 'column', 
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center',
    	backgroundColor: '#A6CFBD',
	},
	statBoxesContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
	},
	statBox: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		padding: 15,
	},
  	statNumberCount: {
		//number for the stats in the row in the middle of the screen
		//flex: 1,
		//flexDirection: 'row',
		//justifyContent: 'space-around',
		//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
		fontSize: 30,
	},
	statCountTitles: {
		//the titles of the stats in row in the middle of the screen
		flex: 1,
		//flexDirection: 'row',
		//justifyContent: 'space-around',
		//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
		fontSize: 11,
	},
	postsContainer:{
		flex: 1,
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
	},
});