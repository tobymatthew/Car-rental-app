import { registerRootComponent } from 'expo';
import { Buffer } from 'buffer';


import App from './App';
global.btoa = (str) => {
    return new Buffer(str, 'binary').toString('base64');
  };
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
