import * as React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookDonateScreen from '../Screens/BookDonateScreen'
import BookRequestScreen from '../Screens/BookRequestScreen'

const TabNavigator = createBottomTabNavigator({
    Donate:{screen:BookDonateScreen},
    Request:{screen:BookRequestScreen}
})

export default TabNavigator