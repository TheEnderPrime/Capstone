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
		marginBottom: 20
	},
	likeTextButton: {
		fontSize: 16,
		color: "white",
		fontWeight: "bold"
	},
	likeButton: {
		alignSelf: 'center',
		backgroundColor: "#e8938e",
		borderRadius: 10,
		height: 50,
		width: 200,
		margin: 10
	},
	titleText: {
		marginLeft: 5,
		fontSize: 30,
		//padding: 5,
		fontWeight: 'bold',
		color: '#fff',
		//textDecorationLine: 'underline',
		// marginTop: 10,
	}, 
	descriptionText: {
		marginLeft: 5,
		fontSize: 18,
		padding: 5,
		color: '#fff'
	},
	postTimeline:{
		flex: 5,
		paddingTop: 1, 
		backgroundColor: '#E0E0E0',
	},
});