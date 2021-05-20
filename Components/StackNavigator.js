import * as React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import BookDonateSCreen from '../Screens/BookDonateScreen'
import ReceiverDetailsScreen from '../Screens/RecieverDetailsScreen'
import MyDonationsScreen from '../Screens/MyDonationScreen'

const StackNavigator = createStackNavigator({
    Donate : {screen : BookDonateSCreen,navigationOptions: {headerShown:false}},
    ReceiverDetail : {screen : ReceiverDetailsScreen,navigationOptions: {headerShown:false}},
    MyDonations : {screen : MyDonationsScreen,navigationOptions: {headerShown:false}},
},{
    initialRouteName:'Donate'
})

export default StackNavigator
