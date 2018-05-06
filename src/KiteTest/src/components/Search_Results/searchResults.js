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

import {RkButton} from 'react-native-ui-kitten';

var {height, width} = Dimensions.get('window');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class searchResult extends Component {
	
	constructor(){
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

	setUserIdAsync(state){
		return new Promise((resolved) => {
			this.setState(state, resolved)
		});
	}

	async componentWillMount(){
		const user = await AsyncStorage.getItem('userID')
        await this.setUserIdAsync({userID: user});
        const { params } = this.props.navigation.state;
        const Data = params.data ? params.data : "";
        const DataSource = ds.cloneWithRows(Data);
        this.setState({"dataSource": DataSource});
	}

//CHANGE EACHTWEET TO WORK FOR USERS, EVENTS, AND COMMUNITIES

	eachTweet(x){
		return(
			<TouchableOpacity 
			  	style={{width:width, height:90, borderBottomWidth:1, borderColor:'#e3e3e3'}}
				onPress={() => this.props.navigation.navigate("Event", {eventID: x.id})}
			>
		  		<View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
					<Image
						source={require('../../images/guy.jpeg')}
						resizeMode="contain"
						style={{ width: 54, height: 54, borderRadius: 27, margin: 10}}
					/>
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row', marginLeft:5, marginTop:5, alignItems:'center'}}>
							<Text style={{color:'#fff', fontWeight:'600', fontSize:12}}>{x.FirstName} {x.LastName}</Text>
							<Text style={{color:'#fff', fontWeight:'500', fontSize:12}}> | @ {x.title}</Text>
						</View>
						<View style={{ margin:5, marginRight:10,}}>
							<Text style={{fontSize:13, color:'#fff', fontWeight:'400'}}>{x.description}</Text>
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
				</View>
			);
		}
	}

}