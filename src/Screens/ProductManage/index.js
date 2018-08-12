import React, { Component } from 'react';
import {
    View,
    TextInput,
    Platform,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    ImageBackground,
    ActivityIndicator,
    Text,
    AsyncStorage,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from 'react-native';

import { vendor_getShopList, vendor_login, vendor_signup } from "../../Components/Api";
import Spinner from 'react-native-loading-spinner-overlay';
import Search from 'react-native-search-box';
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;

export default class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            keyword: ''
        })

    }

    async componentDidMount() {

    }

    async searchProducts(){

        alert(this.searchBox.searchBar.Text);

    }


    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>
                <View style={{width: '90%', height: '100%'}}>


                    <Search 
                        ref="search_box"
                        styles={{tintColorSearch: 'blue'}}
                        // placeholderTextColor="Search"
                        // tintColorSearch='#EC6A41'
                        /**
                         * There many props that can customizable
                         * Please scroll down to Props section
                         */
                    />


                </View>

                {/* <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Image source={require('../../Assets/Images/login_bottom_bg.png')}
                                        style={{width: '80%', height: '100%', resizeMode: 'contain'}} />
                </View> */}

            </SafeAreaView>
        );
    }
}