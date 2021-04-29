import * as React from 'react'
import {Text , TextInput , TouchableOpacity , View , StyleSheet} from 'react-native'
import firebase from 'firebase'
import db from '../Config'
import AppHeader from '../Components/AppHeader'

export default class BookRequestScreen extends React.Component{
constructor(){
    super()
    this.state={
        bookName:"",
        reason:"",
        userId:firebase.auth().currentUser.email,
        requestId:0
    }
}

createRequestId=()=>{
       this.setState({requestId:this.state.requestId+1})
}

addRequest=async()=>{
    this.createRequestId()
    console.log(this.state.requestId)
await db.collection("requested_book").add({
    "user_id":this.state.userId ,
    "bookName":this.state.bookName,
    "reason":this.state.reason,
    "request_id":"req"+this.state.requestId
})
alert('The new Request is Added') 
}

    render(){
        return(
            <View>
                <AppHeader header="Request Book"/>
                <TextInput
                style={styles.input}
                placeholder="Name of the Book"
                onChangeText={(text)=>{this.setState({bookName:text})}}
                value={this.state.bookName}></TextInput>

                <TextInput 
                style={styles.input}
                placeholder= "Why do you need this book?"
                onChangeText={(text)=>{this.setState({reason:text})}}
                value={this.state.reason}></TextInput>

                <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest()}}>
                    <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    input:{
        width:"80%",
        height:55,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
        width:300,
   height:50,
   justifyContent:'center',
   alignSelf:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10,
   marginTop:20
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      }
})