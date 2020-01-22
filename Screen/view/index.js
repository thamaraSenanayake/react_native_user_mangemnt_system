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
  ActivityIndicator,
  Alert
} from 'react-native';
import {connect} from 'react-redux'
import Update from '../update'

class ViewUser extends Component {
  
  static navigationOptions = {
    headerShown: false,
  }

  constructor(){
    super();
    this.state={
        loading:true,
        dataSource:null,
        deleteUserId:''
    }
    
  }

  showAlert(id){
    this.setState({
      deleteUserId:id
    });

    Alert.alert(
      'Error !',
      'Are you sure you want to delete this?',
      [
        { text: 'YES', 
          onPress: () => this.props.DeleteFromUserList(id),
        },
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  editButtonPress(id){
    console.log("88888888");
    this.props.setUserEdit(id);
    // this.props.navigation.navigate('Account');
  }

  componentDidMount(){
      return fetch('http://192.168.8.102/react/viewUser.php',
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
              this.props.setUserList(res);
              this.setState({
                  loading:false,
              })       
          }
      );
  }



  render(){  
    let widget=[];
      if (this.props.editClick == "true") {
        widget=<Update/>
      }
      else if (this.state.loading) {
          widget.push(
              <View style={styles.loadder}>
                  <ActivityIndicator/>
              </View>
          )
      } else {
          this.props.userList.map((val,key)=>{

              widget.push(
                  <View key={key} style={styles.userDisplay}>
                      <View style={styles.userDisplayData}>
                          <Text style={styles.title}>Name</Text>
                          <Text style={styles.text}>{val.userName}</Text>
                          <Text style={styles.title}>City</Text>
                          <Text style={styles.text}>{val.city}</Text>
                      </View>
                      <View style={styles.userDisplayButton}>
                          <TouchableOpacity 
                            style={styles.button}
                            onPress={()=> this.editButtonPress(val.id)}
                          > 
                              <Text style={styles.buttonText}>
                                  Edit
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.buttonDelete} onPress={()=>this.showAlert(val.id )}> 
                              <Text style={styles.buttonText}>
                                  Delete
                              </Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              )

          })
      }
    return (           
      <View style={styles.outterContainer}>
        <View style={styles.row}>
        <Text>{this.props.editClick}{this.props.username}</Text>
          <TouchableOpacity  onPress={this.props.navigation.openDrawer} style={styles.tabButton}>
            <Text style={styles.tabButtonColor} >
                drawer
            </Text>
          </TouchableOpacity>
        </View>
        
        {widget}             
        
      </View>
    );
  }
}

function mapStateToProps(state) {
  return{
      username:state.username,
      editClick:state.editClick,
      userList:state.userList
  }
}

function mapDispatchToProps(dispatch) {
  return{
    setUserEdit:(id)=>{
        dispatch({type:'EDIT_USER',userId:id})
    },
    setUserList:(userList)=>{
      dispatch({type:'SET_USER_LIST',list:userList})
    },
    DeleteFromUserList:(id)=>{
      dispatch({type:'DELETE',id:id})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewUser);

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
    marginBottom:10,
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

  userDisplay:{
    margin:10,
    //height:30,
    backgroundColor:'#eee',
    flexDirection:'row'
  },    

  userDisplayData:{
    
    padding: 10,
    flexDirection:'row',
    flex:3,
    // backgroundColor:'red'
  },

  userDisplayButton:{
    flexDirection:'row',
    flex:1,
    // backgroundColor:'black'
  },

  text:{
    color:"#161924",
    fontSize:20,
    fontWeight:"500",
    marginLeft:10
  },

  title:{
    marginLeft:10,
    color:"#161924",
    fontSize:20,
    fontWeight:"bold"
  },

  loadder:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
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
    // width:200,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 5,
    // height:40,
    // flex:1,
  },

  buttonDelete:{
    backgroundColor:"#8b0046",
    // width:200,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 5,
    // height:40,
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