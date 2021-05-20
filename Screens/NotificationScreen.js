import * as React from 'react'
import {Text ,View , FlatList} from 'react-native'
import firebase from 'firebase'
import db from '../Config'
import AppHeader from '../Components/AppHeader'
import {List,Divider} from 'react-native-paper'

export default class NotificationScreen extends React.Component{

    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[]
        }
    }


    getNotifications=async()=>{
        await db.collection("all_notifications").where("targeted_userId","==",this.state.userId)
        .where("status","==","unread").onSnapshot((response)=>{
            response.forEach((doc)=>{
                var notification = doc.data()
                this.setState({allNotifications:notification})
            })
        })
    }

    renderItem=({item,index})=>{
        return(
            <View>
                <List.Item
                key={index}
                title={item.message}
                description={item.book_name}/>
                <Divider/>
            </View>
        )
    }
    
    render(){
        return(
            <View>
                <AppHeader header="Notifications"/>
                {this.state.allNotifications.length===0
                ?(<Text>No Notifications</Text>)
                :(<FlatList
                data={this.state.allNotifications}
                renderItem={()=>{this.renderItem}}
                keyExtractor={(item,index)=>{index.toString()}}
                ></FlatList>)}
            </View>
        )
    }
}