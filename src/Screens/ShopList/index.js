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
} from 'react-native';

import { vendor_getShopList } from "../../Components/Api";
import Styles from './styles';

export default class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
        })

        this.onAddButton = this.onAddButton.bind(this);
    }

    async componentDidMount() {

        // let json = await vendor_getShopList()

        // alert(json.result);
        // this.setState({
        //     animating: false,
        // })

    }

    onAddButton() {
        this.props.navigation.navigate("ShopHomeScreen")
    }

    render() {
        return (
            <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 1}}>
            <SafeAreaView style={Styles.safeArea}>
                <ImageBackground source={require('../../Assets/Images/shoplist_bottom_bg.png')}
                                    style={{position: 'absolute', bottom: 0, width: '100%', height: 120, alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 45, height: 45, alignItems: 'center', justifyContent: 'center', marginTop: 40}}
                        onPress={this.onAddButton}>
                        <Image source={require('../../Assets/Images/shoplist_plus_button.png')}
                               style={{width: 60, height: 60}} />
                    </TouchableOpacity>
                </ImageBackground>
            </SafeAreaView>
            </View>
        );
    }
}