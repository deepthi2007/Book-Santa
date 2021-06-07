import * as React from 'react'
import {Text , TextInput , TouchableOpacity , View , StyleSheet , TouchableHighlight , FlatList} from 'react-native'
import firebase from 'firebase'
import db from '../Config';
import AppHeader from '../Components/AppHeader';
import BookSearch from 'react-native-google-books';

export default class BookRequestScreen extends React.Component{
constructor(){
    super()
    this.state={
        bookName:"",
        reason:"",
        userId:firebase.auth().currentUser.email,
        requestId:0,
        isBookRequestActive:true,
        bookStatus:"",
        docId:"",
        userDocId:"",
        donorId:"",
        userName:"",
        dataSource:"",
        showFlatList:false
    }
}

getBooksApi=async(bookName)=>{
    this.setState({bookName:bookName})
    if(bookName.length>3){
  var books = await BookSearch.searchbook(bookName,"AIzaSyASyOjOtJla-X-b3io2eLoaUc_bIRFSIIc")
  console.log(books)
  this.setState({dataSource:books.data,showFlatList:true})
    }
}

getIsBookRequestActiveDetails=async()=>{
    await db.collection("users").where("email_id","==",this.state.userId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            var request = doc.data()
            this.setState({isBookRequestActive:request.isBookRequestActive,
                            userDocId: doc.id,
                            userName : request.first_name+" "+request.last_name })
        })
    })
}

componentDidMount=async()=>{
    this.getIsBookRequestActiveDetails()
    this.getStatus()
}

createRequestId=()=>{
       this.setState({requestId:this.state.requestId+1})
}

addRequest=async()=>{
    var books = await BookSearch.searchbook(this.state.bookName,"AIzaSyASyOjOtJla-X-b3io2eLoaUc_bIRFSIIc")
    this.createRequestId()
    console.log(this.state.requestId)
await db.collection("requested_book").add({
    "user_id":this.state.userId ,
    "bookName":this.state.bookName,
    "reason":this.state.reason,
    "request_id":"req"+this.state.requestId,
    "book_status":"Pending",
    "image_link":books.data[0].volumeInfo.imageLinks.thumbnail
})
alert('The new Request is Added') 
}

getStatus=async()=>{
    await db.collection("requested_book").where("user_id","==",this.state.userId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            if(doc.data().book_status==="Pending"){
            this.setState({requestId:doc.data().request_id,
                           bookName:doc.data().bookName,
                            bookStatus:doc.data().book_status,
                            docId:doc.id})
            }
        })
    })
}

updateStatus=async()=>{
    await db.collection("requested_book").doc(this.state.docId).update({
        book_status:"Recieved"
    })
    await db.collection("users").doc(this.state.userDocId).update({
        isBookRequestActive:true
    })
}

sendNotification=async()=>{
    await db.collection("all_notifications").where("request_id","==",this.state.requestId)
    .get().then((response)=>{
        response.forEach((doc)=>{
            var details= doc.data()
            var donorId = details.donor_userId
            this.setState({donorId:donorId})
            var bookName = details.book_name
         db.collection("all_notifications").add({
            "targeted_userId":donorId,
            "donor_userId":this.state.userId,
            "message":this.state.userName +" "+ "Has Recived The Book",
            "request_id":this.state.requestId,
            "book_name":bookName,
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "status":"unread"
         })
        })
    })
}
addAllRecievedBooks=async(bookName)=>{
 await db.collection("recieved_books").add({
     "recieverId":this.state.userId,
     "book_name":this.state.bookName,
     "request_id":this.state.requestId,
     "status":"Recieved"
 })
}

renderItem=({item,index})=>{
    return(
        <View>
            <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={()=>{this.setState({bookName:item.volumeInfo.title,
                                         showFlatList:false})}}
            borderDivider>
                <Text>{item.volumeInfo.title}</Text>
            </TouchableHighlight>
        </View>
    )
}

    render(){
        if(this.state.isBookRequestActive===true){
        return(
            <View>
                <AppHeader header="Request Book"/>

                <TextInput
                style={styles.input}
                placeholder="Name of the Book"
                onChangeText={(text)=>{this.getBooksApi(text)}}
                value={this.state.bookName}></TextInput>

                {this.state.showFlatList===true
                ?(
                    <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index)=>{index.toString()}}
                    enableEmptySections={true}
                    ></FlatList>
                )
                :(<View>
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
                )}

            </View> 
        )}else{
            return(
            <View>
            <Text>Book Name : {this.state.bookName}</Text>
            <Text>Status : {this.state.bookStatus}</Text>
            <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={()=>{
                this.updateStatus()
                this.sendNotification()
                this.addAllRecievedBooks(this.state.bookName)
            }}>
                <Text style={styles.buttonText}>I Received The Book</Text>
            </TouchableOpacity>
            </View>
            )
        }
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
        color:'#fff',
        fontWeight:'200',
        fontSize:20,
        textAlign:"center"
      }})