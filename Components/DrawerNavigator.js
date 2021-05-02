import * as React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import TabNavigator from './TabNavigator'
import CustomSideBar from './customSideBar'
import UpdateProfileScreen from '../Screens/UpdateProfileScreen'

 const DrawerNavigator = createDrawerNavigator({
    Home:{screen:TabNavigator},
    UpdateProfile :{screen: UpdateProfileScreen}
}, {
    contentComponent:CustomSideBar
}, {
    initialRouteName:'Home'
})

export default DrawerNavigator