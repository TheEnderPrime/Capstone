import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import Timeline from 'react-native-timeline-listview';

import styles from './styles';

class Posts extends React.Component {

	constructor(){
		super()
	}

	onRefresh(){
		//set initial data
	}
	
	onEndReached() {
		//fetch next data
	}
	
	renderFooter() {
			//show loading indicator
			if (this.state.waiting) {
					return <ActivityIndicator />;
			} else {
					return <Text>~</Text>;
			}
	}

	onEventPress(data){
    //this.props.navigation.navigate("Posts")
  }

 	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>Post Title Here</Text>
					<Text>Overall Likes and Comments</Text>
				</View>

				<View style={styles.postTimeline}>
					<Text>PUT YOUR SHIZ HERE ANDREW</Text>
				</View>
			</View>

		);
	}
}



  export default Posts;