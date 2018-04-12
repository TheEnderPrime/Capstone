import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		//justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: 'rgba(47,44,60,1)',
	},
	titleText: {
		//flex: 1,
		textAlign: 'center',
		fontSize: 30,
		padding: 20,
	},
	textInput: { 

	},
	button: {
		// flex: 1,
		// padding: 20,
	},
	text: {
		fontSize: 15,
	},
  	textBox: { 
		padding: 10,
  	}, 
	  postTimeline:{
		flex: 6,
		padding: 10, 
		//paddingTop: 65,
		backgroundColor: '#A6CFBD',
	},
	timelineList: {
		flex: 1,
		marginTop: 20,
	},
});