import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		alignContent: 'space-around',
		backgroundColor: 'rgba(47,44,60,1)',
	},
	titleText: {
		marginLeft: 5,
		fontSize: 18,
		padding: 5,
		color: '#fff',
		textDecorationLine: 'underline',
		// marginTop: 10,
	}, 
	textBox: {
		// flex: 1,
	},
	postInput:{
		flex: 1,
		padding: 10, 
		backgroundColor: 'rgba(47,44,60,1)',
	},
	button: {
		//flex: 1,
	},
	text: {
		color: '#fff',
		fontSize: 15,
		marginLeft: 10,
	},	
});