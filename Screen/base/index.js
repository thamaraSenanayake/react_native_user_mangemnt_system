/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';
import{createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AddUser,UpdateUser,ViewUser} from './Screens';
import SlideBar from './SlideBar';

const DrawerNavigator = createDrawerNavigator(
  {
    AddUser,
    UpdateUser,
    ViewUser

  },
  {
    contentComponent:props=><SlideBar {...props}/>
  }
);

export default createAppContainer(DrawerNavigator);



