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
        this.onPressItem = this.onPressItem.bind(this);
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
        this.props.navigation.navigate("AddShopScreen")
    }

    onPressItem(item) {
        this.props.navigation.navigate("ShopHomeScreen",{shopInfo: item})
    }

    render() {
        return (
            <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 1}}>
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <FlatList
                    ItemSeparatorComponent={ () => <View style={ { width: '100%', height: 0.3, backgroundColor: 'gray' } } /> }

                    style={{flex: 1, width: '100%', height: '100%', marginBottom: 32}}
                    data={this.state.shopArray}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, separators}) => {
                        let imageLocation = "http://ls.antonioantek.com/images/" + item.preview + ".jpg"
                        return <TouchableHighlight
                        onPress={() => this.onPressItem(item)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        style={{backgroundColor: 'red', height: 80, width: '100%'}}>
                            <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                <Image source={{uri: imageLocation}}
                                        style={{width: 60, height: 60, resizeMode: 'contain', borderRadius: 30, borderWidth: 0.3, borderColor: 'gray', marginLeft: 20}} />
                                <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginLeft: 20}}>{item.name}</Text>
                                <Image source={require('../../Assets/Images/shoplist_arrow_icon.png')}
                                        style={{width: 13, height: 18, resizeMode: 'contain', position: 'absolute', right: 20}} />
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