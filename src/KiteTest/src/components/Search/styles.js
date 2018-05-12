import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		padding: 20,
		//justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	//alignItems: 'center', // cross axis (opposite of the flexDirection) => 
		backgroundColor: 'rgba(47,44,60,1)',
	},
	titleText: {
		flex: 1,
		textAlign: 'center',
		fontSize: 40,
		padding: 20,
		color: '#fff',
		fontWeight: 'bold',
	},
	textInput: { 
		flex: 3,
	},
	button: {
		flex: 2,
		// padding: 20,
	},
	text: {
		fontSize: 20,
		textAlign: 'left',
		marginBottom: 10,
		color: '#fff',
	},
  	textBox: { 
		padding: 10,
  	}, 
	  postTimeline:{
		flex: 6,
		padding: 10, 
		//paddingTop: 65,
		backgroundColor: 'rgba(47,44,60,1)',
	},
	timelineList: {
		flex: 1,
		marginTop: 20,
	},
});