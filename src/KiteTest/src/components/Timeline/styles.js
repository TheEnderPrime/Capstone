import {StyleSheet} from 'react-native';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: '#A6CFBD',
  	},
	timelineContainer:{
		flex: 2,
		padding: 20, 
		paddingTop: 65,
		backgroundColor: '#A6CFBD',
	},
	timelineList: {
		flex: 1,
		marginTop: 20,
	}
});