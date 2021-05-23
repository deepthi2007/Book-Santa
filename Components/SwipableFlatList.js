import * as React from 'react'
import {Dimensions , View , Text , StyleSheet , Animated} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'
import {ListItem , Icon } from 'react-native-elements'
import firebase from 'firebase'
import db from '../Config'

export default class SwipableFlatList extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            allNotifications:this.props.allNotifications,
            width:Dimensions.get('window').width
        }
        console.log(this.state.allNotifications)
    }

    renderItem=({data,index})=>{
        {console.log(data)}
            <Animated.View>
               <ListItem
        leftElement={<Icon name="book" type="font-awesome" color="#696969" />}
        title={data.book_name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={data.message}
        bottomDivider
      />
            </Animated.View>
    }

    renderHiddenItem=()=>{
        return(
            <View style={styles.rowBack}>
                <View style={[styles.backRightbtn,styles.backRightbtnRight]}>
                    <Text style={styles.text}> Marked as Read</Text>
                </View>
            </View>
        )
    }

    onSwipeValueChange=(swipeData)=>{
        var notifications = this.state.allNotifications
        const {key,value} = swipeData
        console.log(swipeData)
        if(value<-Dimensions.get('window').width){
            var newData = [...notifications]
            console.log(notifications[key])
            this.updateMarkAsRead(notifications[key])
            newData.splice(key,1)
            this.setState({allNotifications:newData})
        }
    }

    updateMarkAsRead=async(notifs)=>{
        await db.collection("all_notifications").doc(notifs.doc_id).update({
            "status":"read"
        })
    }

    render(){
        return(
            <View>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=>{index.toString()}}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                onSwipeValueChange={this.onSwipeValueChange}
                previewRowKey={0}
                previewOpenValue={-40}
                previewOpenDelay={3000}></SwipeListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rowBack:{
        alignItems:"center",
        backgroundColor:"orange",
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        padding:20
    },
    backRightbtn:{
        alignItems:"center",
        position:"absolute",
        top:0,
        bottom:0,
        width:100
    },
    backRightbtnRight:{
        backgroundColor:"yellow",
        right:0
    },
    text:{
        color:"#fff",
        fontWeight:"bold",
        fontSize:15,
        textAlign:"center",
        alignSelf:"flex-start"
    }
})