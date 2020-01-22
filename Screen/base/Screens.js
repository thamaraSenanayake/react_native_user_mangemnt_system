import React from 'react';
import Account from '../account';
import UpdateScreen from '../update';
import ViewScreen from '../view';

export const AddUser = ({navigation}) => <Account navigation={navigation} name = "add users"/>
export const UpdateUser = ({navigation}) => <UpdateScreen navigation={navigation} name = "update user"/>
export const ViewUser = ({navigation}) => <ViewScreen navigation={navigation} name = "view user"/>