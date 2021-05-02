import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import TabNavigator from './Components/TabNavigator'
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import DrawerNavigator from './Components/DrawerNavigator'

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
DrawerNavigator:{screen:DrawerNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)
