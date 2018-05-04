import {StyleSheet} from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection)
    	alignContent: 'center', // cross axis (opposite of the flexDirection)
		backgroundColor: 'rgba(47,44,60,1)',
  	},
  	logo: {
		
 	},
  	logoText: {
		marginTop: 15,
		marginBottom: 15,
    	fontSize: 60,
    	textAlign: 'center',
		color: Colors.kite_greenMediumLight
  	}, 
  	welcome: {
  	},
  	welcomeWords: {
    	textAlign: 'center',
		marginTop: 10,
		marginBottom: 50,
		fontSize: 20,
  	},
});