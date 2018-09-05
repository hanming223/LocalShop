/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, View, SafeAreaView} from 'react-native';

import {PrimaryNav, StartNav, MainTabBar, AppSwitch} from "./src/Router";
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB53ffCQrPZlqbk3g_KJuvwKi7mG27sOIU",
  authDomain: "localshop-35331.firebaseapp.com",
  databaseURL: "https://localshop-35331.firebaseio.com",
  storageBucket: "localshop-35331.appspot.com",
  projectId: "localshop-35331",
  messagingSenderId: "937195172665"

};


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      isLoggedIn: null
    })
  }

  async componentDidMount() {

    let firebaseApp = firebase.initializeApp(firebaseConfig);

    // await AsyncStorage.setItem("is_loggedin", JSON.stringify(true))

    // AsyncStorage.getItem("is_loggedin")
    // .then(value=>{
      
    //   if (value == null){
    //     this.setState({isLoggedIn: false});
    //   }else{
    //     this.setState({isLoggedIn: JSON.parse(value)});
    //   }

    // })
  }

    render() {
      
      return (
        <AppSwitch/>
      )
      
      // <StartNav />

      //   if (this.state.isLoggedIn == false){
          
      //     return (
      //       <StartNav />
            
      //     );
      //   }else if (this.state.isLoggedIn == true){
          
      //     return (
            
      //       <View style={{flex: 1, backgroundColor: 'blue'}}>
      //         <MainTabBar />
      //       </View>
      //     );
      //   }else{
      //     return (
      //       <View/>
      //     );
      //   }

      
    }
}

