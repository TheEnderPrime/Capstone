import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(47,44,60,1)',
	},
	eventInfo: {
		flex: 1, 
		flexDirection: 'row', 
		marginBottom: 50
	},
	titleText: {
		marginLeft: 5,
		fontSize: 18,
		padding: 5,
		
		color: '#fff',
		textDecorationLine: 'underline',
		// marginTop: 10,
	}, 
	postTimeline:{
		flex: 5,
		padding: 10, 
		backgroundColor: '#A6CFBD',
	},
});