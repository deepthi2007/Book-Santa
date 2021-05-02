import * as React from 'react'
import {Text , View , FlatList } from 'react-native'
import {List , Divider} from 'react-native-paper'
import db from '../Config'
import firebase from 'firebase'
import AppHeader from '../Components/AppHeader'

export default class BookDonateScreen extends React.Component{

constructor(){
    super()
    this.state={
        userId:firebase.auth().currentUser.email,
        allRequests:[]
    }
}

getRequests=async()=>{
 var Requests= await db.collection("requested_book").get()

  Requests.docs.map((doc)=>{
      var bookRequests = doc.data()
      console.log(bookRequests)
      this.setState({allRequests:bookRequests})
  })
}

showFlatList=(item,index)=>{
    return(
        <View style={{marginTop:20}}>
        <List.Item
    title={item.bookName}
    description={item.reason}
  />
  <TouchableOpacity > 
           <Text style={{color:'black'}}>View</Text> 
           </TouchableOpacity>
           <Divider/>
           </View>
    )
}

componentDidMount=()=>{
    this.getRequests()
}

    render(){
        return(
            <View style={{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center'  }}>
                <AppHeader header="Donate Book"/>
                {console.log(this.state.allRequests)}
                {this.state.allRequests.length===0
                ? (<Text>List of All Requested Books</Text>)
            :
               ( <FlatList
                data={this.state.allRequests}
                renderItem={this.showFlatList}
                keyExtractor={(item,index)=>{index.toString()}}></FlatList>
   )}
            </View>
        ) 
    }
}