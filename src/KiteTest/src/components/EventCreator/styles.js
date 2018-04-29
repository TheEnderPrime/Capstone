import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		backgroundColor: 'rgba(47,44,60,1)',
	},
	titleView: {
		flex: 1, 
		flexDirection: 'row', 
		marginBottom: 10
	},
	Title: {
		flex: 1,
		marginTop: 20,
		fontSize: 25,
		padding: 5,
		color: '#fff',
		textAlign: 'center',
		
		// textDecorationLine: 'underline',
		marginTop: 10,
	}, 
	textBox: {
		flex: 2,
	},
	text: {
		color: '#fff',
		fontSize: 15,
		marginLeft: 10,
	},
	button: {
		flex: 1
	}
});