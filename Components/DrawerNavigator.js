import * as React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import TabNavigator from './TabNavigator'
import CustomSideBar from './customSideBar'
import UpdateProfileScreen from '../Screens/UpdateProfileScreen'
import MyDonationScreen from '../Screens/MyDonationScreen'
import NotificationScreen from '../Screens/NotificationScreen'
import MyRequestsScreen from '../Screens/MyRequestsScreen'

 const DrawerNavigator = createDrawerNavigator({
    Home:{screen : TabNavigator},
    UpdateProfile :{screen : UpdateProfileScreen},
    MyDonations : {screen : MyDonationScreen},
    MyRecievedBooks : {screen : MyRequestsScreen},
    Notification : {screen : NotificationScreen}
}, {
    contentComponent:CustomSideBar
}, {
    initialRouteName:'Home'
})

export default DrawerNavigator