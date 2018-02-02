import { StyleSheet } from 'react-native';
import Colors from '../../Colors/Colors';

module.exports = styles = StyleSheet.create({
	container: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'space-around', //main axis (the flexDirection)
		alignContent: 'center', // cross axis (opposite of the flexDirection)
		backgroundColor: Colors.kite_greenMediumLight,
	},
	logo: {

	},
	logoText: {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 40,
		textAlign: 'center',
		color: Colors.kite_greenDark
	},
	welcome: {
	},
	welcomeWords: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 20,
		fontSize: 30,
		color: Colors.kite_greenDark
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