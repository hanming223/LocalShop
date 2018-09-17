/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, AsyncStorage, View, SafeAreaView, Alert} from 'react-native';

import {PrimaryNav, StartNav, MainTabBar, AppSwitch} from "./src/Router";
import firebase from 'react-native-firebase';
import { vendor_save_firebase_token } from "./src/Components/Api";


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    this.checkPermission();
    this.createNotificationListeners();

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        AsyncStorage.setItem('fcmToken', fcmToken);
        this.saveFirebaseToken(fcmToken)
    });

  }

  async saveFirebaseToken(fcmToken){

    let formData = new FormData();
    formData.append('token', fcmToken);
    let json = await vendor_save_firebase_token(formData)

  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    this.onTokenRefreshListener();

  }


  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;

        const localNotification = new firebase.notifications.Notification()
                                                          .setTitle(title)
                                                          .setBody(body);

        firebase.notifications().displayNotification(localNotification)


    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });

  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

  async getToken() {
    
    let fcmToken = await AsyncStorage.getItem('fcmToken', null);
    
    if (fcmToken == null) {
        fcmToken = await firebase.messaging().getToken();
        
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }

    console.log('fcmtoken', fcmToken)

  }

    
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

    render() {
      
      return (
        <AppSwitch/>
      )
      
    }
}

