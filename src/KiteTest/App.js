import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text,} from 'react-native';
import{ Root, Tabs } from './src/config/router';

import Splash   from './src/components/Splash/Splash';
import Welcome  from './src/components/Welcome/Welcome';
import Login    from './src/components/Login/Login';
import Signup   from './src/components/Signup/Signup';
import Timeline from './src/components/Timeline/Timeline';
import Profile  from './src/components/Profile/Profile';

class App extends Component {
  render() {
    return <Root />;  //eventuall call Splash which will call WelcomeStack to
                      // fix the back button problem
  }
}

export default App;



