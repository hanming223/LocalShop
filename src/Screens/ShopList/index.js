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
    FlatList,
    TouchableHighlight
} from 'react-native';

import { vendor_getShopList } from "../../Components/Api";
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';

export default class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: true,
            shopArray: []
        })

        this.onAddButton = this.onAddButton.bind(this);
    }

    async componentDidMount() {

        let json = await vendor_getShopList()

        this.setState({loading: false})

        
        if (json.result == true){
            
            let shopList = json.message;
            
            let temp = this.state.shopArray;
            
            for (i = 0; i < shopList.length; i++){

                let shop = shopList[i].shop;
                temp.push(shop);
                
            }
      
            this.setState({shopArray: temp});

        }else{
            
        }

    }

    onAddButton() {
        this.props.navigation.navigate("ShopHomeScreen")
    }

    render() {
        return (
            <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 1}}>
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <FlatList
                    style={{flex: 1, width: '100%', height: '100%', marginBottom: 35, backgroundColor: 'blue'}}
                    data={this.state.shopArray}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, separators}) => {
                        return <TouchableHighlight
                        onPress={() => this._onPress(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        style={{backgroundColor: 'red', height: 100, width: '100%'}}>
                            <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../Assets/Images/login_bottom_bg.png')}
                                        style={{width: 70, height: 70, resizeMode: 'contain'}} />
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    }}
                />

                <ImageBackground source={require('../../Assets/Images/shoplist_bottom_bg.png')}
                                    style={{position: 'absolute', bottom: 0, width: '100%', height: 130, alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 45, height: 45, alignItems: 'center', justifyContent: 'center', marginTop: 35}}
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