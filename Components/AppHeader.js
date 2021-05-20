import * as React from 'react';
import {View} from 'react-native';
import {Header , Icon , Badge} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../Config'
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
/* onPress={()=>{this.props.navigation.toggleDrawer()}} */

export default class AppHeader extends React.Component{

constructor()
{
    super()
    this.state={
        value:0,
        userId:firebase.auth().currentUser.email
    }
}

getUnreadNotifications=async()=>{
    await db.collection("all_notifications").where("targeted_userId","==",this.state.userId)
    .where("status","==","unread").get().then((response)=>{
        response.forEach((doc,index)=>{
            var notifications = doc.data()
            var value = notifications.length
            this.setState({value:value})
        })
    })
}

componentDidMount=()=>{
    this.getUnreadNotifications()
}

bellIconWithBadge=()=>{
    return(
        <View>
            <Icon
            name="bell"
            type="font-awesome"
            color="green"
            size={25}
            onPress={()=>{this.props.navigation.navigate('Notification')}}/>
            <Badge
            value={this.state.value}
            status="error"
            containerStyle={{position:"absolute",top:-4,right:-4}}
            />
        </View>
    )
}

    render(){
        return(
            <View>
            <SafeAreaProvider>
        <Header
        leftComponent={<Icon
                          name="bars"
                          type="font-awesome"
                          color="green"
                          size={25}
                          />}
  centerComponent={{ text:this.props.header, style: { color: '#fff' } }}
  rightComponent={<this.bellIconWithBadge {...this.props}/>}
  backgroundColor={"#F8BE85"}
/>
</SafeAreaProvider>
</View>
)
    }
}