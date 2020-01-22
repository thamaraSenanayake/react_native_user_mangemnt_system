/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';


class Account extends Component {
  
  static navigationOptions = {
    headerShown: false,
  }

  constructor(){
    super();

    this.state={
      username:'',
      password:'',
      city:'',
      replyText:''
    }

    this.setUserName = this.setUserName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setCity = this.setCity.bind(this);
    this.AddButtonPress = this.AddButtonPress.bind(this);
   // this.checkInsert = this.checkInsert.bind(this);
    
  }

  setUserName(text){
    this.setState({
      username:text,
      replyText:''
    });
  }

  setPassword(text){
    this.setState({
      password:text,
      replyText:''
    });
  }

  setCity(text){
    this.setState({
      city:text,
      replyText:''
    });
  }

  AddButtonPress(){
    if (this.state.username.length == 0) {
      this.setState({
        replyText:'Enter username'
      });
      return;
    } else if (this.state.password.length == 0) {
        this.setState({
          replyText:'Enter password'
        });
        return;
    }
    else if (this.state.city.length == 0) {
      this.setState({
        replyText:'Enter city'
      });
      return;
    }

    fetch('http://192.168.8.100/react/addUser.php',
    {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            password:this.state.password,
            userName:this.state.username,
            city:this.state.city
        })
    }).then(res=>{
        return res.text()
    }).then(
        res=>this.setState({replyText:res})
    );
  }

  render(){  
    
    return (           
      <View style={styles.outterContainer}>
        
        <View style={styles.row}>
          <TouchableOpacity  onPress={this.props.navigation.openDrawer} style={styles.tabButton}>
            <Text style={styles.tabButtonColor} >
                drawer
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>

          <Text style={styles.text}>
              Enter username
          </Text>
          <TextInput placeholder="username"
              underlineColorAndroid="black"
              style={styles.textInput}
              onChangeText={(text)=>this.setUserName(text)}
              
          />

          <View style={styles.sizeBox}></View>

          <Text style={styles.text}>
              Enter password
          </Text>
          <TextInput placeholder="password"
              underlineColorAndroid="black"
              onChangeText={(text)=>this.setPassword(text)}
              secureTextEntry={true}
          />

          <View style={styles.sizeBox}></View>  

          <Text style={styles.text}>
              Enter city
          </Text>
          <TextInput placeholder="city"
              underlineColorAndroid="black"
              onChangeText={(text)=>this.setCity(text)}
          />

          <View style={styles.sizeBox}></View>
          <Text style={styles.errorText}>{this.state.replyText}</Text>


          <View style={styles.center}>
              <TouchableOpacity style={styles.button} onPress={this.AddButtonPress}>
                  <Text style={styles.buttonText}>
                      Add
                  </Text>
              </TouchableOpacity>
          </View>

        </View>
        
        
      </View>
    );
  }
}

export default Account;

const styles = StyleSheet.create({

  textInput:{
    height:50
  },  

  outterContainer:{
      flex:1,
      backgroundColor:"white",
  },

  row:{
    height:50,
    alignItems:'flex-end',
  },

  tabButton:{
    margin: 5,
    padding: 10,
    backgroundColor:"#00468b",
    alignItems:'center',
    color:'#fff',
    justifyContent:'center'
  },

  tabButtonColor:{
    color:'#fff',
  },

  text:{
    color:"#161924",
    fontSize:20,
    fontWeight:"500"
  },

  sizeBox:{
    height:20,
    // backgroundColor:'red'
  },

  content:{
    //backgroundColor:"red",
    paddingHorizontal: 20,
    flex:1,
  },

  button:{
    backgroundColor:"#00468b",
    width:200,
    alignItems:'center',
    justifyContent:'center',
    height:40,
    // flex:1,
    },

    center:{
        // backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
        // justifyContent:'center'
    },

    buttonText:{
        color:'#fff',
        textAlign:'center',
        // backgroundColor:'red',
        marginTop:0,
      // marginBottom:10,
        fontSize:18,
        justifyContent:'center',
    },

    errorText:{
      color:"red",
      fontSize:18,
      fontWeight:"500"
    },

    
  // container:{
  //   flex:1,
  //   backgroundColor:"white",
  //   alignItems: 'center',
  //   justifyContent:'center'
  // },

  // button:{
  //     alignItems:'flex-end',
  //     // margin:16,
  //     paddingTop:10,
  //     paddingRight:10,
  //     // backgroundColor:"red",
  //     // width:50,

  // },

  // text:{
  //     color:"#161924",
  //     fontSize:20,
  //     fontWeight:"500"

  // },
});