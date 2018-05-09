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

import { RkButton } from 'react-native-ui-kitten';
import { RkTheme } from 'react-native-ui-kitten';
import { RkCard } from 'react-native-ui-kitten';
import { RkText } from 'react-native-ui-kitten';

var { height, width } = Dimensions.get('window');
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Discover extends Component {

	constructor() {
		super()


		this.state = {
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
			data: this.data,
		}
	}

	loadTimeline = () => {

		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getMainTimeLine', {
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

	async componentWillMount() {
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({ userID: user });
		this.loadTimeline();
	}

	eachTweet(x) {
		return (
			<TouchableOpacity
				style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 6, paddingTop: 6 }}
				onPress={() => this.props.navigation.navigate("Event", { eventID: x.id })}
			>
				<RkCard rkType='story'>
					<Image rkCardImg 
						source={{ uri: x.ProfilePicture }} 
						resizeMode="contain"
						style={{ height: 200 }} />
					<View rkCardHeader>
						<RkText rkType='header'>{x.title}</RkText>
					</View>
					<View rkCardContent>
						<RkText style={{ textAlign: 'center' }}>
							{x.description}
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
						//initialListSize={6}
						onEndReached={() => this.onEndReached()}
						//renderFooter={() => this.renderFooter()}
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