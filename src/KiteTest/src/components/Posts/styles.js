import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection) =>center, space-around, space-between
    	alignItems: 'center', // cross axis (opposite of the flexDirection) => 
    	backgroundColor: 'rgba(47,44,60,1)',
  	},
  	header: { 
		// flex: 1,
		// flexDirection: 'column',
		// justifyContent: 'space-around',
		// alignItems: 'center',
		padding: 15,
	}, 
	title: {
		color: '#fff',
		alignItems: 'center',
		fontSize: 40,
	},
	post: {
		flex: 5,
	},
	postText:{
		color: '#fff',
		padding: 20,
		
	},
});