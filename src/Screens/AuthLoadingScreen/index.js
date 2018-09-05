import React, { Component } from 'react';
import {
    View,
    AsyncStorage
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      
        AsyncStorage.getItem("is_loggedin")
        .then(value=>{
        
        if (value == null){
            this.props.navigation.navigate('Start');
        }else{
            this.props.navigation.navigate('Main');
        }

        })

    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View/>
          
      );
    }
  }