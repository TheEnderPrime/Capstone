import {StyleSheet} from 'react-native';

module.exports =  styles = StyleSheet.create({
	container: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection)
		alignContent: 'center', // cross axis (opposite of the flexDirection)
		backgroundColor: '#A6CFBD',
	},
	logo: {

	},
	logoText: {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 40,
		textAlign: 'center',
		color: '#277552'
	},
	welcome: {
	},
	welcomeWords: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 20,
		fontSize: 30,
		color: '#277552'
	},
	button: {
		marginTop: 20,
		marginBottom: 20,
	},
	password: {
		marginTop: 5,
		textAlign: 'center',
	},
	textInputBox: {
		height: 40,
	},
});