import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, Button, Icon, View, Header } from 'react-native';
import { StackNavigator, createBottomTabNavigator, createSwitchNavigator  } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';
import KeyboardManager from 'react-native-keyboard-manager'


import ShopList from "./Screens/ShopList";
import Login from "./Screens/Login";
import ShopHome from "./Screens/ShopHome";
import AddShop from "./Screens/AddShop";
import ShopInfo from "./Screens/ShopInfo";
import ShopSchedule from "./Screens/ShopSchedule";
import ShopView from "./Screens/ShopView";
import ProductManage from "./Screens/ProductManage";
import AppManager from './Components/AppManager';
import AddProduct from './Screens/AddProduct';
import AddNewProduct from './Screens/AddNewProduct';
import SimilarProduct from './Screens/SimilarProdcut';
import ChatInbox from './Screens/ChatInbox';
import NotificationList from './Screens/NotificationList';
import AddProductSelectVariant from './Screens/AddProductSelectVariant';
import AddNewVariant from './Screens/AddNewVariant';
import ShopSetting from './Screens/ShopSetting';
import ShopScheduleUpdate from './Screens/ShopScheduleUpdate';
import VendorSetting from './Screens/VendorSetting';
import AuthLoadingScreen from './Screens/AuthLoadingScreen'


console.disableYellowBox = true;

// KeyboardManager.setEnable(false);
// KeyboardManager.setToolbarPreviousNextButtonEnable(true);


export const PrimaryNav = StackNavigator({

    ShopListScreen: { 
        screen: ShopList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Hello Vendors!</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41'},
            headerTintColor: 'white'
        }), 
    },

    ShopHomeScreen: { 
        screen: ShopHome,
        
    },

    AddShopScreen: { 
        screen: AddShop,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add New Shop</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    ShopInfoScreen: { 
        screen: ShopInfo,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Shop Information</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    ShopScheduleScreen: { 
        screen: ShopSchedule,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Shop Schedule</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    ShopViewScreen: { 
        screen: ShopView,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{AppManager.getInstance.selectedShopInfo.name}</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    ProductManageScreen: { 
        screen: ProductManage,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{AppManager.getInstance.selectedShopInfo.name}</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    AddProductScreen: { 
        screen: AddProduct,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>What you want to sell</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    AddNewProductScreen: { 
        screen: AddNewProduct,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Congratulations!</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    SimilarProductScreen: { 
        screen: SimilarProduct,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Hey!</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    AddProductSelectVariantScreen: { 
        screen: AddProductSelectVariant,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Hey!</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    AddNewVariantScreen: { 
        screen: AddNewVariant,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Add new variant</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    ShopSettingScreen: { 
        screen: ShopSetting,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Setting</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    ShopScheduleUpdateScreen: { 
        screen: ShopScheduleUpdate,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Schedule Update</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

    VendorSettingScreen: { 
        screen: VendorSetting,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Vendor Setting</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41' },
            headerTintColor: 'white'
        }), 
    },

})

export const ChatNav = StackNavigator({
    ChatInboxScreen: { 
        screen: ChatInbox,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Inbox</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41'},
            headerTintColor: 'white'
        }), 
    }
})

export const NotificationNav = StackNavigator({
    NotificationListScreen: { 
        screen: NotificationList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Inbox</Text>  ,
            headerStyle: { backgroundColor: '#EC6A41'},
            headerTintColor: 'white'
        }), 
    }
})

export const MainTabBar = createBottomTabNavigator(
    {
        Home: PrimaryNav,
        Chat: ChatNav,
        Notification: NotificationNav
    },

    {
        navigationOptions: ({ navigation }) => ({

        tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;

        return (

            routeName == 'Home' ? (
                <Image source={require('./Assets/Images/tab_home_icon.png')} style={{width: 25, height: 25, resizeMode: 'contain', tintColor}} />
            ):
            routeName == 'Chat'? (
                <Image source={require('./Assets/Images/tab_chat_icon.png')} style={{width: 25, height: 25, resizeMode: 'contain', tintColor}} />
            ):(
                <Image source={require('./Assets/Images/tab_notification_icon.png')} style={{width: 25, height: 25, resizeMode: 'contain', tintColor}} />
            )

        )
        
      }

    }),

    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#CACBCB',
      style: {backgroundColor: '#EC6A41'}
    },

  });

    export const StartNav = StackNavigator({
        LoginScreen: Login
    }, {
        headerMode: 'none',
    })

    export const AppSwitch = createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            Start: StartNav,
            Main: MainTabBar
        },
        {
            initialRouteName: 'AuthLoading'
        }
    );