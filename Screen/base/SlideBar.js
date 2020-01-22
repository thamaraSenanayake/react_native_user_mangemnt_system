import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

export default SlideBar = props =>(
    <ScrollView>
        <ImageBackground
            source={require("../../assets/Background.jpg")}
            style={styles.imageBackground}
        >

        <Image 
            source={require("../../assets/profilePic.jpg") }
            style={styles.profilePic}
        />

        </ImageBackground>

        <View style={styles.container}>
            <DrawerNavigatorItems {...props}/>
        </View>
    </ScrollView>

);



const styles = StyleSheet.create({
    imageBackground:{
        padding: 16,
        paddingTop:40,
        width:undefined
    },
    profilePic:{
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:3,
        borderColor:'white'
    },

    container:{
        flex:1
    }

});