import * as React from 'react'
import { TouchableOpacity , StyleSheet} from 'react-native'
import {Text ,View} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'

export default class CustomSideBar extends React.Component{
    render(){
        return(
            <View style={{flex:1}}>
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