import * as React from 'react'
import {Text ,View , FlatList} from 'react-native'
import firebase from 'firebase'
import db from '../Config'
import AppHeader from '../Components/AppHeader'
import {List,Divider} from 'react-native-paper'
import SwipableFlatList from '../Components/SwipableFlatList'

export default class NotificationScreen extends React.Component{

    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotifications:[],
            doc_id:""
        }
        this.requestref=null
    }


    getNotifications=async()=>{
     this.requestref = await db.collection("all_notifications").where("targeted_userId","==",this.state.userId)
        .where("status","==","unread").onSnapshot((response)=>{
            var notification = []
            response.forEach((doc)=>{
                 notification.push(doc.data())
                            })
            
            this.setState({allNotifications:notification})
        })
    }

    componentDidMount=()=>{
        this.getNotifications()
    }

    componentWillUnmount=()=>{
        this.requestref
    }
    
    render(){
        return(
            <View>
                <AppHeader header="Notifications"/>
                {this.state.allNotifications.length===0
                ?(<Text>No Notifications</Text>)
                :(<SwipableFlatList 
                allNotifications={this.state.allNotifications}>
                </SwipableFlatList>)}
            </View>
        )
    }
}