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

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// Returns search results from Search.js

export default class searchResult extends Component {
	
	constructor(){
		super()
		
		this.state = {
			isRefreshing: false,
			waiting: false,
			selected: null,
			dataSource: ds.cloneWithRows([]),
			data: this.data,
		}
	}

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentWillMount(){
		const user = await AsyncStorage.getItem('userID')
        await this.setUserIdAsync({userID: user});
        const { params } = this.props.navigation.state;
		const DataSource = params.data ? params.data : "";
		const SearchType  = params.searchType ? params.searchType : "";
		this.setState({searchType: SearchType});
		this.setState({dataSource: ds.cloneWithRows(DataSource.timeline)});
	}

	eachTweet(x){
		if(this.state.searchType == "user") {
			return(
				<TouchableOpacity 
				onPress={() => this.props.navigation.navigate("SearchProfile", {"userID": x.UsersId})}>
					<RkCard rkType='story' style={{ marginTop:10, paddingTop: 8, paddingBottom:8, backgroundColor: '#E0E0E0',
						 borderRadius:10, borderWidth: 1 }}>		

						<View style={{ flex: 1, flexDirection: 'row'}}>
							
							<Image  source={{uri: x.ProfilePicture}} resizeMode="contain"
								style={{ height: 80, width: 100, flex: 1, justifyContent: 'flex-start'}}/>
							
							<View style={{ flex: 4, flexDirection: 'column', marginLeft: 15, marginTop: 5}}>
								<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 3, fontWeight: 'bold', fontSize: 25, textDecorationLine: 'underline' }}>{x.FirstName} {x.LastName}</RkText>
								<RkText rkType='header' style={{ flex: 2, textAlign: 'left', marginTop: 5, marginRight: 5,  fontWeight: 'bold', fontSize: 15 }}>{"Joined: " + x.time}</RkText>
								<RkText rkType='header' style={{ flex: 1, textAlign: 'left', marginTop: 5, marginRight: 5, fontSize: 12 }}> {x.AboutMe == null || x.AboutMe == "" ? "..." : "About Me: " + x.AboutMe}</RkText>
							</View>
						</View>
					</RkCard>
				</TouchableOpacity> 
			)
		} else if(this.state.searchType == "event") {
			return(
				<TouchableOpacity onPress={() => this.props.navigation.navigate("Event", { eventID: x.id })}>
					<RkCard rkType='story' style={{ marginTop:10, paddingTop:0, paddingBottom:8,
										backgroundColor: '#E0E0E0', borderRadius:10, borderWidth: 1 }}>		

						<View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#E0E0E0', borderRadius:10, 
									paddingTop:7, borderTopWidth: 1, backgroundColor: Colors.kite_greenMediumDark}}>
							<Image  source={{uri: x.ProfilePicture}} resizeMode="contain"
								style={{ width:80, height: 70, alignSelf: 'flex-start'}}/>
							<View style={{ flex: 1, flexDirection: 'row', marginTop: 5}}>
								<RkText rkType='header' style={{ alignSelf: 'flex-start', flex: 1, marginLeft: 10, fontWeight: 'bold', fontSize: 25 }}>{x.FirstName} {x.LastName}</RkText>
								<RkText rkType='header' style={{ textAlign: 'left', marginTop: 5, marginRight: 5,  fontWeight: 'bold', fontSize: 12 }}>{x.time}</RkText>
							</View>
						</View>
						<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
							<Image rkCardImg source={{uri: x.PostImage == "-" ? null : x.PostImage}} resizeMode="cover"/>
							<View style={{backgroundColor: '#E0E0E0'}}>
								<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25,  marginLeft: 10, textDecorationLine: 'underline'}}>
										{x.title}
								</RkText>
								<RkText style={{ marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 0, alignSelf: 'flex-start' }}>
											Description: {x.description}
								</RkText>
							</View>
						</View>
					</RkCard>
			</TouchableOpacity>
			)
		} else {
			return(

				<TouchableOpacity 
					  style={{margin: 5, backgroundColor: 'rgb(47,44,60)'}}
					onPress={() => this.props.navigation.navigate("SearchCommunity", {communityID: x.CommunityId})}
				>
					<RkCard rkType='story' style={{borderRadius:10, borderWidth: 1,  backgroundColor: '#E0E0E0'}}>		
						<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
							<View>
								<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 25, textDecorationLine: 'underline'}}>
									{x.Title}
								</RkText>
							</View>
							
							<Image rkCardImg source={{uri: x.ProfilePicture}}  resizeMode="cover"/>
							<View style={{}}>
								<View style={{ flex: 4, flexDirection: 'column', marginLeft: 15, marginTop: 5}}>
									
									<RkText style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>
										{"Created: " + x.time}
									</RkText>
									<RkText style={{ textAlign: 'left' }}>
										{x.AboutUs == null || x.AboutUs == "" ? "" : "About us: " + x.AboutUs}
									</RkText>
								</View>
							</View>
						</View>
					</RkCard>
				</TouchableOpacity>
			)
		}
	}

  	render() {
		if ( this.state.isRefreshing ) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large"/>
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<ListView 
						enableEmptySections={true}
						dataSource = {this.state.dataSource}
						renderRow = {(rowData) => this.eachTweet(rowData)}
					/>
				</View>
			);
		}
	}
}