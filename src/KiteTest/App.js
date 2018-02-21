import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text,} from 'react-native';
import{ Root } from './src/config/router';


class App extends Component {
  render() {
    return <Root />;  //eventuall call Splash which will call WelcomeStack to
                      // fix the back button problem
  }
}

export default App;



