import * as React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookDonateScreen from '../Screens/BookDonateScreen'
import BookRequestScreen from '../Screens/BookRequestScreen'
import StackNavigator from './StackNavigator'

const TabNavigator = createBottomTabNavigator({
    Donate:{screen : StackNavigator},
    Request:{screen : BookRequestScreen}
})

export default TabNavigator