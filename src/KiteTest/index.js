import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTimageLoader']);
console.disableYellowBox = true;

AppRegistry.registerComponent('KiteTest', () => App);
