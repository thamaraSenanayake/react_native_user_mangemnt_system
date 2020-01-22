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
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux'


class Update extends Component {
  
  static navigationOptions = {
    headerShown: false,
  }

  constructor(){
    super();
    this.state={
      replyText:'',
      loadFinish:false,
      dataSource:null,
      city:''
    }

    this.setCity = this.setCity.bind(this);
    this.doneEditButtonPress = this.doneEditButtonPress.bind(this); 
  }

  setCity(text){
    this.setState({
      city:text,
      replyText:''
    });
  }

  doneEditButtonPress(){
    if (this.state.city.length == 0) {
      this.setState({
        replyText:'enter city'
      });
      return;
    }

    fetch('http://192.168.8.102/react/updateUser.php',
      {
          method:'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
              userId:this.props.editUserId,
              city:this.state.city,
          })
      }).then(res=>{
          return res.text()
      }).then(
          resText=>{
            if (resText=="1") {
              this.props.doneUserEdit(this.props.editUserId,this.state.city);
            } else {
              this.setState({
                replyText:resText
              });
            }
          }
      );
  }

  componentDidMount(){
    return fetch('http://192.168.8.102/react/viewUserById.php?userId='+this.props.editUserId+'',
    {
        method:'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res=>{
        return res.json()
    }).then(
        res=>{
            this.setState({
                loadFinish:true,
                dataSource:res
            })
        }
    );
}

  render(){  

    if (this.state.loadFinish) {
      console.log(this.state.dataSource[0].userName);
      // this.setState({
      //   city:this.state.dataSource[0].city,
      // });
      return (           
        <View style={styles.outterContainer}>
  
          <View style={styles.content}>
  
            <Text style={styles.text}>
                Enter username
            </Text>
            <TextInput placeholder="username"
                underlineColorAndroid="black"
                style={styles.textInput}
                value={this.state.dataSource[0].userName}   
                editable={false} 
            />
  
            <View style={styles.sizeBox}></View>  
  
            <Text style={styles.text}>
                Enter city
            </Text>
            <TextInput placeholder="city"
                underlineColorAndroid="black"
                onChangeText={(text)=>this.setCity(text)}
                defaultValue={this.state.dataSource[0].city}
                
                
            />
  
            <View style={styles.sizeBox}></View>
            <Text style={styles.errorText}>{this.state.replyText}</Text>
  
            <Text>{this.props.editUserId}</Text>
            <View style={styles.center}>
                <TouchableOpacity style={styles.button} onPress={this.doneEditButtonPress}>
                    <Text style={styles.buttonText}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
  
          </View>
          
        </View>
      );
    } else {

      return(
        <View style={styles.outterContainer}>
          <ActivityIndicator/>
        </View>
      );
      
    }
    
  }
}

function mapStateToProps(state) {
  return{
      editUserId:state.editUserId,
      editClick:state.editClick
  }
}

function mapDispatchToProps(dispatch) {
  return{
    doneUserEdit:(id,city)=>{
        dispatch({type:'DONE_EDIT',id:id,city:city})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Update);

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

  
});