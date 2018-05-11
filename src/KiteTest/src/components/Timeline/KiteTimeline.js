import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	AsyncStorage,
	Alert,
	RefreshControl,
	ActivityIndicator,
	Dimensions,
	ListView,
	Image,
} from 'react-native';

import styles from './styles';
import Colors from '../../Colors/Colors'
import { RkButton } from 'react-native-ui-kitten';
import { RkTheme } from 'react-native-ui-kitten';
import { RkCard } from 'react-native-ui-kitten';
import { RkText } from 'react-native-ui-kitten';

var { height, width } = Dimensions.get('window');
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class KiteTimeline extends Component {

	constructor() {
		super()

		this.data = []

		this.state = {
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
			data: this.data,
		}
	}

	// loads timeline data into json which then is used by eachTweet to create the timeline
	loadTimeline = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getFollowersEventsTimeLine', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({

				UserID: this.state.userID,

			})

		}).then((response) => response.json())
			.then((responseJson) => {

				// If server response message same as Data Matched
				if (responseJson.isValid === 'valid') {

					this.setState({ isRefreshing: true });
					this.setState({
						data: responseJson.timeline,
						dataSource: ds.cloneWithRows(responseJson.timeline),
						isRefreshing: false
					});
					//parse array from responseJson

				}
				else {
					Alert.alert(responseJson.error);
				}

			}).catch((error) => {
				console.error(error);
			});
	}

	setUserIdAsync(state) {
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	// calls loadTimeline
	async componentWillMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({ userID: user });
		this.loadTimeline();
	}

	// creates timeline one event at a time
	eachTweet(x) {
		return (
			<TouchableOpacity
				style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5, paddingTop: 5 }}
				onPress={() => this.props.navigation.navigate("Event", { eventID: x.id })}
			>

				<RkCard rkType='story'>		
					<View style={{ flex: 1, flexDirection: 'row', backgroundColor: Colors.kite_greenMediumDark}}>
						<Image  source={{uri: x.ProfilePicture}} resizeMode="contain"
							style={{ width:80, height: 70, alignSelf: 'flex-start'}}/>
						<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 25 }}>{x.FirstName} {x.LastName}</RkText>
					</View>
					<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', backgroundColor: '#E0E0E0'}}>
						<Image rkCardImg source={{uri: x.PostImage}} style={{height:  (Dimensions.get('window').height/4), flexGrow:1, }} resizeMode="cover"/>
						<View>
						<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 20,  marginLeft: 10, textDecorationLine: 'underline'}}>
								{x.title}
						</RkText>
						</View>
						<RkText style={{ margin: 10, alignSelf: 'flex-start' }}>
								Description: {x.description}
						</RkText>
					</View>
				</RkCard>
			</TouchableOpacity>
		)
	}

	render() {
		if (this.state.isRefreshing) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" />
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<ListView
						enableEmptySections={true}
						dataSource={this.state.dataSource}
						renderRow={(rowData) => this.eachTweet(rowData)}
					/>
				</View>
			);
		}
	}

}
RkTheme.setType('RkCard', 'story', {
	img: {
		height: 100,
		opacity: 0.7
	},
	header: {
		alignSelf: 'center'
	},
	content: {
		alignSelf: 'center'
	}
});
