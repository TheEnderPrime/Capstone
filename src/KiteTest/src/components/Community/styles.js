import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
  	},
  	header: { 
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
		backgroundColor: '#A6CFBD',
		padding: 15,
	}, 
	profilePicture: {
		flex: 4,
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
		fontSize: 30,
	},
	statCountTitles: {
		//the titles of the stats in row in the middle of the screen
		fontSize: 11,
	},
	timelineContainer:{
		flex: 3,
		padding: 10, 
		backgroundColor: '#A6CFBD',
	},
	timelineList: {
		flex: 1,
		marginTop: 20,
	}

});