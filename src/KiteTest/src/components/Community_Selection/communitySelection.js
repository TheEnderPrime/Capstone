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

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// add to stack/router navigation
// change eachTweet to show community name and info
// navigate to specific Community

export default class communitySelection extends Component {
	
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

	loadCommunities = () => {
		fetch('http://web.engr.oregonstate.edu/~kokeshs/KITE/functions/TimeLine.php?f=getCommunityTimeLine', {
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

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentWillMount(){
		const user = await AsyncStorage.getItem('userID')
		await this.setUserIdAsync({userID: user});
		this.loadCommunities();
	}

	eachTweet(x){
		return(
			<TouchableOpacity 
			  	style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}
				onPress={() => {AsyncStorage.setItem('communityIDSettings', x.CommunityID), this.props.navigation.navigate("Community", {communityID: x.CommunityID})}}
			>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					<Image 
						source={{ uri: x.ProfilePicture }}
						resizeMode="contain" 
						style ={{height:54, width:54, borderRadius:27, margin:10}} 
						/>
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
							<Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>{x.Title}</Text>
							{/* <Text style={{color:'#fff', fontWeight:'500', fontSize:12}}> | @ {x.title}</Text> */}
						</View>
						<View style={{ margin:5, marginRight:10,}}>
							<Text style={{fontSize:13, color:'#fff', fontWeight:'400'}}>{x.AboutUs}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
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
					<Button
						style={buttonColor = '#78B494'} 
						title="Create Community" 
						onPress = {() => this.props.navigation.navigate('CommunityCreator', {userID: this.state.userID})}
					/>
				</View>
			);
		}
	}

}