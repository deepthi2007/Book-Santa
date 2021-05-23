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
        allDonations:[]
    }
    this.requestref=null
}


getMyDonations = async()=>{
  this.requestref=  await db.collection("my_Donations").where("donor_id","==",this.state.donorId)
    .onSnapshot((response)=>{
        console.log(this.state.donorId)
        var donations=[]
        response.forEach((doc)=>{
        donations.push(doc.data())
        })
        
        this.setState({allDonations:donations})
        console.log(donations)
    })
}

changeStatus = async()=>{
    await db.collection("my_Donations").where("donor_id","==",this.state.donorId)
    .update({
        "status":"BOOK SENT"
    })
}

componentDidMount=()=>{
    this.getMyDonations()
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
    style={{borderWidth:1,width:70,height:40}}>
        <Text>Send Book</Text>
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