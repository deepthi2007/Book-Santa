import * as React from 'react'
import {Text , View , FlatList } from 'react-native'
import {ListItem} from 'react-native-elements'
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
  var Requests= db.collection("requested_book").get()

  Requests.docs.map((doc)=>{
      var bookRequests = doc.data()
      this.setState({allRequests:bookRequests})
  })
}

showFlatList=()=>{
    return(
      /*   <ListItem 
        key={i} 
        title={this.state.allRequests.bookName} 
        subtitle={this.state.allRequests.reason} 
        titleStyle={{ color: 'black', fontWeight: 'bold' }} 
        rightElement={ 
           <TouchableOpacity > 
           <Text style={{color:'black'}}>View</Text> 
           </TouchableOpacity> } 
        bottomDivider /> */
        <View>
            <Text 
            style={{ color: 'black', fontWeight: 'bold' }}>
                {this.state.allRequests.bookName}</Text>
            <Text>{this.state.allRequests.reason}</Text>
        </View>
    )
}

componentDidMount=()=>{
    this.getRequests()
}

    render(){
        return(
            <View>
                <AppHeader header="Donate Book"/>
                <FlatList
                data={this.state.allRequests}
                renderItem={this.showFlatList()}
                keyExtractor={(item,index)=>{index.toString()}}></FlatList>
            </View>
        ) 
    }
}