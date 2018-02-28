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

class KiteTimeline extends React.Component {

	static propTypes = {
        //: PropTypes.object.isRequired,
        //: PropTypes.func.isRequired,
    };

    state = {
        //deal: this.props.initialDealData,
        //imageIndex: 0,
	};
	
	constructor(){
		super()
		this.data = [
			{time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
		    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
		    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
		    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
				{time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
				{time: '14:00', title: 'Event 6', description: 'Event 6 Description'},
		]
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

  render() {
    return (
    	<View style={styles.container}>
			<View style={styles.timelineContainer}>
				<Timeline
					style={styles.timelineList}
					data={this.data}
					circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
					timeContainerStyle={{minWidth:72}}
					circleSize={-100}
					
				/>
			</View>
		</View>

    );
  }
}



  export default KiteTimeline;