import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';
import{
  StackNavigator,
}from 'react-navigation';

import Welcome from './src/components/Welcome/Welcome';
import Login from './src/components/Login/Login';
import Signup from './src/components/Signup/Signup';
import Splash from './src/components/Splash/Splash';

const App = StackNavigator({
  Welcome: { screen: Welcome},
  Login: {screen: Login},
  Signup: {screen: Signup},
  Splash: {screen: Splash},
});
export default App;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignContent: 'center',
// 	},
// });


// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
// } from 'react-native';
// import{
//   StackNavigator,
// }from 'react-navigation';

// import Welcome from './src/components/Welcome/Welcome';
// import Login from './src/components/Login/Login';
// import Signup from './src/components/Signup/Signup';
// import Splash from './src/components/Splash/Splash';

// const App = StackNavigator({
//   Welcome: { screen: Welcome},
//   Login: {screen: Login},
//   Signup: {screen: Signup},
//   Splash: {screen: Splash},
// });
// export default App;

// // export default class App extends Component {
// //   render() {
// //     return (
// //       <Welcome/>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// // 	container: {
// // 		flex: 1,
// // 		alignContent: 'center',
// // 	},
// // });



