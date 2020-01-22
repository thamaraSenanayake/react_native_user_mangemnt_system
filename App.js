/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {} from 'react-native';
import Login from './Screen/login'
import Base from './Screen/base';
import Update from './Screen/update';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {createStore} from 'redux';
import {Provider} from 'react-redux';


const initialState ={
  username:'Test',
  editClick:"false",
  editUserId:"0",
  userList:"",
}

const reducer = (state = initialState,action) =>{
  switch (action.type) {
    case "SET_USERNAME":
      return {
        username:action.username,
        editClick:state.editClick,
        editUserId:state.editUserId,
        userList:state.userList
      }
    case "EDIT_USER":
      return {
        username:state.username,
        editClick:"true",
        editUserId:action.userId,
        userList:state.userList
      }
    case "DONE_EDIT":
        console.log(state.userList);
      return {
        username:state.username,
        editClick:"false",
        editUserId:"0",
        userList:state.userList.map(userList=>
          (userList.id === action.id)?
              {...userList, city:action.city}:
              userList,
        )
      }
      case "DELETE":
          console.log(state.userList);
        return {
          username:state.username,
          editClick:"false",
          editUserId:"0",
          userList:state.userList.filter(userList => userList.id !== action.id),
        }
        // members.filter(memberId => memberId !== id);
    case "SET_USER_LIST":
      
      return {
        username:state.username,
        editClick:state.editClick,
        editUserId:state.editUserId,
        userList:action.list
      }
      
    default:
      break;
  }
  return state;
}

const store = createStore(reducer);

const RootStack = createStackNavigator(
  {
    Login: Login,
    Account:Base,
    Update:Update
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
              <AppContainer />
           </Provider> ;
  }
}