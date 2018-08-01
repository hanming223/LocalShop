import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, Button, Icon, View, Header } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';

import ShopList from "./Screens/ShopList";
import Login from "./Screens/Login";

export const PrimaryNav = StackNavigator({
    ShopListScreen: { 
        screen: ShopList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Hello Vendors!</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            
            
            // header: (props) => <ImageHeader {...props} />,
        }), 
    }
})

const ImageHeader = props => (
    <View style={{ backgroundColor: '#eee' }}>
      <Image
        style={StyleSheet.absoluteFill}
        source={require('./Assets/Images/navigation_bar_bg.png')}
      />
      <Header {...props} style={{ backgroundColor: 'transparent' }}/>
    </View>
  );

const MenuIcon = ({ navigate }) => {
    return (
        <View flexDirection = 'row'>
            <TouchableOpacity style={{width: 30, height: 30}} onPress={this.onSigninButton}>
                <Image source={require('./Assets/Images/notification_icon.png')} style={{width: 20, height: 20}} />
            </TouchableOpacity>

            <TouchableOpacity style={{width: 30, height: 30}} onPress={this.onSigninButton}>
                <Image source={require('./Assets/Images/message_icon.png')} style={{width: 20, height: 20}} />
            </TouchableOpacity>
        </View>
    );
}

export const StartNav = StackNavigator({
    LoginScreen: { screen: Login },
    PrimaryNav: {screen: PrimaryNav}
}, {
    headerMode: 'none',
})