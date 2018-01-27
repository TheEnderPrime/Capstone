import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';
import{
  StackNavigator,
}from 'react-navigation';

import Splash   from './src/components/Splash/Splash';
import Welcome  from './src/components/Welcome/Welcome';
import Login    from './src/components/Login/Login';
import Signup   from './src/components/Signup/Signup';
import Timeline from './src/components/Timeline/Timeline';
import Profile from './src/components/Profile/Profile';

const App = StackNavigator({
  Splash: {screen: Splash},
  Welcome: { screen: Welcome},
  Login: {screen: Login},
  Signup: {screen: Signup},
  Timeline: {screen: Timeline},
  Profile: {screen: Profile},
});
export default App;



