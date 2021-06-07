import * as React from 'react'
import { Text , View , FlatList , TouchableOpacity} from "react-native";
import db from '../Config'
import firebase from 'firebase'
import {List , Divider} from 'react-native-paper'
import AppHeader from '../Components/AppHeader'

export default class MyDonationScreen extends React.Component{

constructor(){
    super()
    this.state={
        donorId:firebase.auth().currentUser.email,
        allDonations:[],
        donorName:""
    }
    this.requestref=null
}

getDonorDetails=async()=>{
    await db.collection("users").where("email_id","==",this.state.donorId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            var details = doc.data()
            this.setState({donorName:details.first_name+" "+details.last_name})
        })
    })
}


getMyDonations = async()=>{
  this.requestref=  await db.collection("my_Donations").where("donor_id","==",this.state.donorId)
    .onSnapshot((response)=>{
        console.log(this.state.donorId)
        var donations=[]
        response.forEach((doc)=>{
            var donation = doc.data()
            donation["doc_id"]=doc.id
        donations.push(donation)
        })
        
        this.setState({allDonations:donations})
        console.log(donations)
    })
}

sendNotification=async(bookDetails,status)=>{
    var requestId = bookDetails.request_id
    var donorId = bookDetails.donor_id

    await db.collection("all_notifications").where("request_id","==",requestId).where("donor_userId","==",donorId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            var message=""
            if(status==="DONOR INTERSTED"){
                message=this.state.donorName+" "+"has Shown Interest in Donating The Book"
            }else{
                message = this.state.donorName+" "+"has sent the book."
                console.log(message)
            }
             db.collection("all_notifications").doc(doc.id).update({
                "message":message,
                "date":firebase.firestore.FieldValue.serverTimestamp(),
                "status":"unread"
            })
        })
    })
}

sendBook = async(bookDetails)=>{
    if(bookDetails.status==="DONOR INTERESTED"){
        await db.collection("my_Donations").doc(bookDetails.doc_id)
    .update({
        "status":"BOOK SENT"
    })
    this.sendNotification(bookDetails,bookDetails.status)
    }else{
        await db.collection("my_Donations").doc(bookDetails.doc_id)
    .update({
        "status":"DONOR INTERESTED"
    })
    this.sendNotification(bookDetails,bookDetails.status)
    }
}

componentDidMount=()=>{
    this.getMyDonations()
    this.getDonorDetails()
}

componentWillUnmount=()=>{
    this.requestref
}

keyExtractor=(item,index)=>{
    index.toString()
}

renderItem=({item,index})=>{
return(
    <View>
        <View style={{marginTop:20,flexDirection:"row",justifyContent:"space-between"}}>
    <List.Item
    key={index}
    title={item.book_name}
    description={item.requested_by +" "+ item.status}/>
    <TouchableOpacity
    onPress={()=>{this.sendBook(item)}}
    style={[{borderWidth:1,width:70,height:40},{
        backgroundColor:item.status==="DONOR INTERESTED"
        ?("orange")
        :("green")
    }]}>
        <Text>{item.status==="DONOR INTERESTED"
              ?("Send Book")
            :("Book Sent")}</Text>
    </TouchableOpacity>
    </View>
    <Divider/>
    </View>
)
}

    render(){
        console.log(this.state.allDonations+"state")
        return(
            <View>
                <AppHeader header="My Donations"/>
                {this.state.allDonations.length===0
                ?(<Text>No Donations Made</Text>)
                :(<View>
                {console.log(this.state.allDonations+"state2")}
                <FlatList
                data={this.state.allDonations}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}>
                </FlatList>
                </View>
                )}
            </View>
        )
    }
}