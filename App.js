import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './Screens/WelcomeScreen';
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import DrawerNavigator from './Components/DrawerNavigator'
import TabNavigator from './Components/TabNavigator'

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
DrawerNavigator:{screen:DrawerNavigator},
TabNavigator :{screen:TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)
