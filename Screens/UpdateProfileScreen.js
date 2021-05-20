import * as React from 'react'
import {Text , 
    TextInput , 
    TouchableOpacity ,
     View , 
     ScrollView , 
     KeyboardAvoidingView , 
    StyleSheet} from 'react-native'
import AppHeader from '../Components/AppHeader'
import db from '../Config'
import firebase from 'firebase'

export default class UpdateProfileScreen extends React.Component{
constructor(){
    super()
    this.state={
        firstName:'',
      lastName:'',
      address:'',
      contact:'',
      email:"",
      userId:firebase.auth().currentUser.email,
      docId:""
    }
}

updateData=async()=>{
  console.log(this.state.docId)
   db.collection("users").doc(this.state.docId).update({
     "first_name":this.state.firstName,
     "last_name":this.state.lastName,
     "address":this.state.address,
     "contact":this.state.contact
   })
   alert("Your Profile is updated")
}

ReadData=async()=>{
  console.log(this.state.userId)
var query= await db.collection("users").where("email_id","==",this.state.userId)
.get().then((snapShot)=>{

//console.log(this.state.userId)

snapShot.forEach((doc)=>{
  //console.log("deepthi")  
  var users = doc.data()
  var Id = doc.id
  this.setState({ firstName:users.first_name,
                  lastName : users.last_name,
                address: users.address,
                  contact:users.contact,
                   email: users.email_id,
                  docId:Id})
                   
console.log(Id)
})
})
}

componentDidMount=()=>{
this.ReadData()
}

    render(){
        return(
            <View>
            <AppHeader header="Update Your Profile"/>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
                value={this.state.firstName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
                value={this.state.lastName}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
                value={this.state.contact}
              />
              <TextInput
                style={styles.AddressTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
                value={this.state.address}
              />
              <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.updateData()}}
          >
          <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
              </KeyboardAvoidingView>
              </ScrollView>
              </View>
        )
    }
}

const styles = StyleSheet.create({
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      button:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      buttonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      AddressTextInput:{
        width:"75%",
        height:75,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
})