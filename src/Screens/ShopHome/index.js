import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    Text,
    View,
    Dimensions
} from 'react-native';

import { vendor_getShopList } from "../../Components/Api";
import Styles from './styles';
import { EventRegister } from 'react-native-event-listeners'
import AppManager from '../../Components/AppManager'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// const SettingIcon = ({ navigate }) => {
//     return (
        
//     );
// }

let _this = null

export default class ShopHome extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{AppManager.getInstance.selectedShopInfo.name}</Text>  ,
        headerStyle: { backgroundColor: '#EC6A41' },
        headerRight: <View flexDirection = 'row' style = {{marginRight: 5}}>
                        <TouchableOpacity style={{width: 30, height: 30}} onPress={()=>_this.onSettingButton()}>
                            <Image source={require('../../Assets/Images/nav_setting_icon.png')} style={{width: 22, height: 22}} />
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={{width: 30, height: 30}} onPress={this.onSigninButton}>
                            <Image source={require('./Assets/Images/message_icon.png')} style={{width: 20, height: 20}} />
                        </TouchableOpacity> */}
                    </View>,
        headerTintColor: 'white'
    })

    constructor(props) {
        super(props);
        this.state = ({
            animating: true,
        })

        this.manageShops = this.manageShops.bind(this);
        this.manageProducts = this.manageProducts.bind(this);

        this.onSettingButton = this.onSettingButton.bind(this);
    }

    async componentDidMount() {
        _this = this
    }

    componentWillUnmount() {
        EventRegister.emit('refreshShopList', 'it works!!!')
    }

    manageShops() {
        this.props.navigation.navigate("ShopViewScreen")
    }

    manageProducts() {
        this.props.navigation.navigate("ProductManageScreen")
    }

    onSettingButton(){
        this.props.navigation.navigate("ShopSettingScreen")
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <SafeAreaView style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <TouchableOpacity style={{width: deviceWidth * 0.93, flex: 10, marginTop: 15}}
                    onPress={this.manageShops}>
                    <ImageBackground source={require('../../Assets/Images/shop_home_shop_bg.png')}
                                style={{width: '100%', height: '100%', alignItems: 'center'}} >
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 70}}>MANAGE SHOP VIEW</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={{width: deviceWidth * 0.93, flex: 10, marginTop: 15}}
                    onPress={this.manageProducts}>
                    <ImageBackground source={require('../../Assets/Images/shop_home_product_bg.png')}
                                style={{width: '100%', height: '100%', alignItems: 'center'}} >
                        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 70}}>MANAGE PRODUCTS</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={{width: deviceWidth * 0.93, flexDirection: 'row', alignItems: 'center', marginTop: 15, flex: 13, marginBottom: 15}}>

                    <View style={{flex: 0.5}}>
                        <TouchableOpacity style={{height: '100%', marginRight: 10}}
                            onPress={this.onSigninButton}>
                            <ImageBackground source={require('../../Assets/Images/shop_home_outlet_bg.png')}
                                        style={{width: '100%', height: '100%', alignItems: 'center'}} >
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 50}}>OUTLET ZONE</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', width: '95%'}}
                        onPress={this.onSigninButton}>
                        <ImageBackground source={require('../../Assets/Images/shop_home_analytics_bg.png')}
                                    style={{width: '100%', height: '100%', alignItems: 'center'}} >
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 50}}>ANALYTICS</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    </View>

                </View>

            </SafeAreaView>
            </View>
        );
    }
}