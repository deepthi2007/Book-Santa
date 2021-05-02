import * as React from 'react'
import {Text , 
    TextInput , 
    TouchableOpacity ,
     View , 
     ScrollView , 
     KeyboardAvoidingView , 
    StyleSheet} from 'react-native'
import AppHeader from '../Components/AppHeader'

export default class UpdateProfileScreen extends React.Component{
constructor(){
    super()
    this.state={
        firstName:'',
      lastName:'',
      address:'',
      contact:'',
      email:""
    }
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
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              />
              <TouchableOpacity
            style={styles.button}
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