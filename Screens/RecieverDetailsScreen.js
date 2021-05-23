import * as React from 'react'
import { View , Text , TouchableOpacity , ScrollView} from "react-native";
import firebase from 'firebase'
import db from '../Config'
import {Card} from 'react-native-elements'
import AppHeader from '../Components/AppHeader'

export default class ReceiverDetailsScreen extends React.Component{

constructor(props){
    super(props)
    this.state={
        bookName:this.props.navigation.getParam('bookDetails')["bookName"],
        reason:  this.props.navigation.getParam('bookDetails')["reason"],
        requestId:this.props.navigation.getParam('bookDetails')["request_id"],
        recieverId : this.props.navigation.getParam('bookDetails')["user_id"],
        recieverName:"",
        contact:"",
        address:"",
        userId:firebase.auth().currentUser.email,
        userName:""
    }
}

getReceiverDetails=async()=>{
    await db.collection("users").where("email_id","==",this.state.recieverId)
    .get().then((snapShot)=>{
        snapShot.forEach((doc)=>{
          var ReceiverDetails = doc.data()
          this.setState({recieverName: ReceiverDetails.first_name + " " +ReceiverDetails.last_name,
                        contact: ReceiverDetails.contact,
                        address : ReceiverDetails.address})
        })
    })
}

getUserDetails=async()=>{
    await db.collection("users").where("email_id","==",this.state.userId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            var userDetails = doc.data()
            this.setState({userName:userDetails.first_name+" "+userDetails.last_name})
        })
    })
}

addNotification=async()=>{
    await db.collection("all_notifications").add({
        "targeted_userId":this.state.recieverId,
        "donor_userId":this.state.userId,
        "message":this.state.userName +" "+ "Has Shown Interest in Donating The Book",
        "request_id":this.state.requestId,
        "book_name":this.state.bookName,
        "date":firebase.firestore.FieldValue.serverTimestamp(),
        "status":"unread"
    })
}

addMyDonation=async()=>{
    await db.collection("my_Donations").add({
        "book_name":this.state.bookName,
        "request_id":this.state.requestId,
        "donor_id":this.state.userId,
        "status":"DONOR INTERESTED",
        "requested_by":this.state.recieverName
    })
}

componentDidMount=()=>{
    this.getReceiverDetails()
    this.getUserDetails()
}

    render(){
        return(
            <View>
                <AppHeader header="Receiver Details"/>
                <ScrollView>
                <View>
                    <Card>
                        <Card.Title>Book Details</Card.Title>
                        <Card.Divider/>
                        <Card>
                            <Text>Book Name : {this.state.bookName}</Text>
                        </Card>
                        <Card>
                            <Text>Reason : {this.state.reason}</Text>
                        </Card>
                    </Card>
                </View> 
                <View>
                    <Card>
                        <Card.Title>Receiver Details</Card.Title>
                        <Card.Divider/>
                        <Card>
                            <Text> Name : {this.state.recieverName}</Text>
                        </Card>
                        <Card>
                            <Text> Address : {this.state.address}</Text>
                        </Card>
                        <Card>
                            <Text> Contact : {this.state.contact}</Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    {this.state.recieverId!=this.state.userId
                    ?(<TouchableOpacity
                    onPress={()=>{this.addNotification();
                        this.addMyDonation()
                    this.props.navigation.navigate('MyDonations')}}>
                        <Text>Donate The Book</Text>
                    </TouchableOpacity>)
                    :(null)}
                </View>
                </ScrollView>
            </View>
        )
    }
}