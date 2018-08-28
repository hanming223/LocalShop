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
    TouchableHighlight,
    RefreshControl
} from 'react-native';

import { EventRegister } from 'react-native-event-listeners'
import { vendor_getShopList } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';


export default class SimilarProduct extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            shopArray: [],
            refreshing: false
        })

        this.onAddButton = this.onAddButton.bind(this)
        this.onPressItem = this.onPressItem.bind(this)

    }

    async componentDidMount() {

    }

    onPressItem(item) {
        
        // AppManager.getInstance.selectedShopInfo = item

        this.props.navigation.navigate("AddProductSelectVariantScreen", {productId: item.id});
        
    }

    async onAddButton(){

    }

    render() {

        return (

            <View style={{flexDirection: 'column', backgroundColor: 'white', flex: 1}}>
   
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                    We have found similar products in our inventory. Tap on product you want to sell.
                </Text>

                <FlatList
                    ItemSeparatorComponent={ () => <View style={ { width: '100%', height: 0.3, backgroundColor: 'gray' } } /> }
                    style={{flex: 1, width: '100%'}}
                    data={AppManager.getInstance.similarProductArray}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, separators}) => {    
                        // let imageLocation = "http://ls.antonioantek.com/images/" + item.preview + ".jpg"
                        return <TouchableHighlight
                                onPress={() => this.onPressItem(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}
                                style={{backgroundColor: 'red', height: 80, width: '100%'}}>
                                    <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                        {/* <View style={{width: 60, height: 60, borderRadius: 30, borderWidth: 0.3, borderColor: 'gray', marginLeft: 20}}>
                                            
                                                <Image source={{uri: imageLocation}}
                                                    style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 30}} />
                                                                         
                                        </View> */}
                                        <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginLeft: 20}}>{item.name}</Text>
                                        <Image source={require('../../Assets/Images/shoplist_arrow_icon.png')}
                                                style={{width: 13, height: 18, resizeMode: 'contain', position: 'absolute', right: 20}} />
                                    </View>
                        </TouchableHighlight>
                    }}
                />

                <TouchableOpacity style={{height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginBottom: 10,
                        marginLeft: 15, marginRight: 15,  marginTop: 15}}
                        onPress={this.onAddButton}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>My product is not in this list</Text>
                </TouchableOpacity>
    
            </View>

        );
    }
}