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

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class ShopHome extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            animating: true,
        })

        this.manageShops = this.manageShops.bind(this);
        this.manageProducts = this.manageProducts.bind(this);
    }

    async componentDidMount() {

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