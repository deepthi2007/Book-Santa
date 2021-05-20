import * as React from 'react'
import {Text , View , FlatList , TouchableOpacity} from 'react-native'
import {List , Divider} from 'react-native-paper'
import db from '../Config'
import firebase from 'firebase'
import AppHeader from '../Components/AppHeader'
import ReceiverDetailsScreen from './RecieverDetailsScreen'

export default class BookDonateScreen extends React.Component{

constructor(){
    super()
    this.state={
        userId:firebase.auth().currentUser.email,
        allRequests:[]
    }
    this.requestRef=null
}

getRequests=async()=>{
 this.requestRef= await db.collection("requested_book")
 .onSnapshot((snapShot)=>{
     var requests=[]
      snapShot.forEach((doc)=>{
       requests.push (doc.data())
     })
     this.setState({allRequests:requests})
 })
}

keyExtractor = (item, index) => {
    index.toString();
              }

renderItem=({item,index})=>{
    return(
        <View>
        <View style={{marginTop:20,flexDirection:"row",justifyContent:"space-between"}}>
        <List.Item
        key={index}
        title={item.bookName}
        description={item.reason}
       />
        <TouchableOpacity 
        style={{borderWidth:1,width:70,height:40}}
        onPress={()=>{
            this.props.navigation.navigate('ReceiverDetail',{bookDetails:item})
            }}> 
           <Text style={{color:'black',fontSize:28}}>View</Text> 
        </TouchableOpacity>
        </View>
           <Divider/>
           </View>
    )
}

componentDidMount=()=>{
    this.getRequests()
}

componentWillUnmount=()=>{
    this.requestRef
}

    render(){
        return(
            <View style={{flex:1}}>
                <AppHeader header="Donate Book"/>
                {console.log(this.state.allRequests)}
                {this.state.allRequests.length===0
                ? (<Text>List of All Requested Books</Text>)
            :
               ( <FlatList
                data={this.state.allRequests}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}></FlatList>
   )}
            </View>
        ) 
    }
}