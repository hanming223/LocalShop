/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, View} from 'react-native';

import {PrimaryNav} from "./src/Router";
import {StartNav} from "./src/Router";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      isLoggedIn: null
    })
  }

  async componentDidMount() {

    // await AsyncStorage.setItem("is_loggedin", JSON.stringify(true))

    AsyncStorage.getItem("is_loggedin")
    .then(value=>{
      
      if (value == null){
        this.setState({isLoggedIn: false});
      }else{
        this.setState({isLoggedIn: JSON.parse(value)});
      }

    })
  }

  render() {
    
    if (this.state.isLoggedIn == false){
      
      return (
        <StartNav />
        
      );
    }else if (this.state.isLoggedIn == true){
      
      return (
        <StartNav />
        // <PrimaryNav />
      );
    }else{
      return (
        <View/>
      );
    }

    
  }
}

