import {StyleSheet} from 'react-native';

module.exports = styles = StyleSheet.create({	
	container: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection)
    	alignContent: 'center', // cross axis (opposite of the flexDirection)
    	backgroundColor: '#78B494',
  	},
  	logo: {
		
 	},
  	logoText: {
		marginTop: 15,
		marginBottom: 15,
    	fontSize: 60,
    	textAlign: 'center',
		color: '#D5EAE0'
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