import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, Button, Icon, View, Header } from 'react-native';
import { StackNavigator } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';

import ShopList from "./Screens/ShopList";
import Login from "./Screens/Login";
import ShopHome from "./Screens/ShopHome";
import AddShop from "./Screens/AddShop";
import ShopInfo from "./Screens/ShopInfo";
import ShopSchedule from "./Screens/ShopSchedule";
import ShopView from "./Screens/ShopView";
import ProductManage from "./Screens/ProductManage";
import AppManager from './Components/AppManager';

// console.disableYellowBox = true;

export const PrimaryNav = StackNavigator({
    ShopListScreen: { 
        screen: ShopList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Hello Vendors!</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41'},
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    },
    ShopHomeScreen: { 
        screen: ShopHome,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{AppManager.getInstance.selectedShopInfo.name}</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    },
    AddShopScreen: { 
        screen: AddShop,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add New Shop</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    },

    ShopInfoScreen: { 
        screen: ShopInfo,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Shop Information</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    },

    ShopScheduleScreen: { 
        screen: ShopSchedule,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Shop Schedule</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    },

    ShopViewScreen: { 
        screen: ShopView,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{AppManager.getInstance.selectedShopInfo.name}</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    },

    ProductManageScreen: { 
        screen: ProductManage,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{AppManager.getInstance.selectedShopInfo.name}</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerRight: <MenuIcon {...navigation} />,
            headerTintColor: 'white'
        }), 
    }

})

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