import React, {Component} from 'react';
import {AppRegistry, Text, View, Navigator} from 'react-native';

import Component5 from './app/components/Component5/Component5';

export default class ui_test extends Component {
  
   render(){
    return(
      <Component5/>
    );
  }
}

AppRegistry.registerComponent('ui_test', () => ui_test);