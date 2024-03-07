import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView} from 'react-native';
import Navigation from './app/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store,persistor} from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import registerNNPushToken from 'native-notify';


export default function App() {
  registerNNPushToken(5244, 'ETIvDuED9iWCUgDvcbadVO');
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <NavigationContainer>
     
      <Navigation/>
    
     </NavigationContainer>
     </PersistGate>
    </Provider>
   
    // <View>
    //   <HostCarDetails/>
    // </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
