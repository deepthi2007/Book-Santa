import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import TabNavigator from './Components/TabNavigator'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'

/* login credentials
userid : abc@gmail.com
password: abc123 */

export default class App extends React.Component {
 render(){
   return(
      <AppContainer/>
    
   )
 }
}

const SwitchNavigator = createSwitchNavigator({
Welcome:{screen:WelcomeScreen},
TabNavigator:{screen:TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
