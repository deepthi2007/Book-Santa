import * as React from 'react'
import {Text , FlatList , View} from 'react-native'
import db from '../Config'
import firebase from 'firebase'
import {List , Divider} from 'react-native-paper'
import AppHeader from '../Components/AppHeader'

export default class MyRequestsScreen extends React.Component{

constructor(){
    super()
    this.state={
        userId:firebase.auth().currentUser.email,
        allRecievedBooks:[]
    }
    this.requestref = null
}

getMyRequests=async()=>{
    this.requestref = await db.collection("recieved_books").where("recieverId","==",this.state.userId)
    .get().then((response)=>{
        var recievedBooks = []
        response.forEach((doc)=>{
            recievedBooks.push(doc.data())
        })
        this.setState({allRecievedBooks:recievedBooks})
        console.log(recievedBooks)
    })
}

componentDidMount=()=>{
    this.getMyRequests()
}

componentWillUnmount=()=>{
    this.requestref
}

renderItem=({item,index})=>{
    console.log(item)
    return(
        <View>
    <List.Item
    key={index}
    title={item.book_name}
    description={ item.status}/>
    <Divider/>
    </View>
    )
}

    render(){
        console.log(this.state.allRecievedBooks)
        return(
            <View>
                <AppHeader header="My Recieved Books"/>
                <View>
                    {this.state.allRecievedBooks.lenght===0
                    ?(<Text>No Books Recieved Yet</Text>)
                    :(
                        <FlatList
                        data={this.state.allRecievedBooks}
                        renderItem={this.renderItem}
                        keyExtractor={(item,index)=>{index.toString()}}>
                        </FlatList>
                    )}
                </View>
            </View>
        )
    }
}