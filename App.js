/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, View, SafeAreaView} from 'react-native';

import {PrimaryNav, StartNav, MainTabBar} from "./src/Router";

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
      
      <StartNav />

        if (this.state.isLoggedIn == false){
          
          return (
            <StartNav />
            
          );
        }else if (this.state.isLoggedIn == true){
          
          return (
            
            <View style={{flex: 1, backgroundColor: 'blue'}}>
              <MainTabBar />
            </View>
          );
        }else{
          return (
            <View/>
          );
        }

      
    }
}

