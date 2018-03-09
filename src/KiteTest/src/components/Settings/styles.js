import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
		backgroundColor: '#A6CFBD',
		padding: 20,
	},
	settingsBlock: {

	},
	header: {
		fontSize: 20,
	},
	titleText: {
		//flex: 1,
		textAlign: 'center',
		fontSize: 30,
		padding: 20,
	},
	textInput: { 
		//flex: 2,
		//flexDirection: 'column',
		//justifyContent: 'space-around',
	},
	button: {
//		flex: 1,
		padding: 20,
	},
	text: {
		fontSize: 15,
	},
  	textBox: { 
		padding: 10,
  	}, 
});