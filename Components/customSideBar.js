import * as React from 'react'
import { TouchableOpacity , StyleSheet} from 'react-native'
import {Text ,View} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import db from '../Config'

export default class CustomSideBar extends React.Component{

constructor(){
    super()
    this.state={
        userId:firebase.auth().currentUser.email,
        userName:"",
        imageName:""
    }
}

getUserName=async()=>{
    await db.collection("users").where("email_id","==",this.state.userId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            this.setState({userName:doc.data().first_name+" "+doc.data().last_name})
        })
    })
}

uploadImage=async(uri,userId)=>{
    var response = await fetch(uri)
    var blob = await response.blob()
    var storageRef = firebase.storage().ref().child("userProfile/"+userId)
    return storageRef.put(blob).then((response)=>{
        console.log("uploaded")
        this.fetchImage(userId)
    })
}

fetchImage=async(userId)=>{
    var storageRef = firebase.storage().ref().child("userProfile/"+userId)
    storageRef.getDownloadURL().then((url)=>{
        this.setState({imageName:url})
    }).catch((error)=>{
        console.log(error.message)
    })
}

selectImage=async()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);

      if (!result.cancelled) {
         this.setState({imageName:result.uri});
         this.uploadImage(result.uri,this.state.userId)
      }
}

componentDidMount=()=>{
    this.getUserName()
    this.fetchImage(this.state.userId)
}

    render(){
        console.log(this.state.userName)
        return(
            <View style={{flex:1}}>
                <View>
                    <Avatar
                    rounded
                    source={{
                        uri:this.state.imageName
                    }}
                    size={"xlarge"}
                    onPress={()=>{this.selectImage()}}/>
                    <Text style={{fontSize:20,fontWeight:"300",color:"orange",padding:10}}>
                        {this.state.userName}</Text>
                </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity 
                    style={styles.logOutButton}
                    onPress={()=>{
                        firebase.auth().signOut()
                        this.props.navigation.navigate('Welcome')
                    }}>
                        <Text style={styles.logOutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({ 
    container : { 
        flex:1 
    }, 
    drawerItemsContainer:{ 
        flex:0.8 
    }, 
    logOutContainer : { 
        flex:0.2, 
        justifyContent:'flex-end',
         paddingBottom:30 
        }, 
    logOutButton : { 
        height:30, 
            width:'100%', 
            justifyContent:'center', 
            padding:10 
        }, 
    logOutText:{ 
                fontSize: 30, 
                fontWeight:'bold' 
            } })