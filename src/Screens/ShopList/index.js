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


export default class ShopList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            shopArray: [],
            refreshing: false
        })

        this.onAddButton = this.onAddButton.bind(this);
        this.onPressItem = this.onPressItem.bind(this);
        this.refreshShopList = this.refreshShopList.bind(this);
        this.fetchShopList = this.fetchShopList.bind(this);
    }

    async componentDidMount() {

        this.fetchShopList()

        EventRegister.addEventListener('refreshShopList', (data) => {
            this.fetchShopListWithoutIndicator()
        })

    }

    async fetchShopList(){

        this.setState({loading: true})

        let json = await vendor_getShopList()

        this.setState({loading: false})

        if (json.result == true){
            
            let shopList = json.message;
            
            let temp = [];
            
            for (i = 0; i < shopList.length; i++){

                let shop = shopList[i].shop;
                temp.push(shop);
                
            }

            this.setState({shopArray: temp});

        }

    }

    async fetchShopListWithoutIndicator(){

        let json = await vendor_getShopList()

        if (json.result == true){
            
            let shopList = json.message;
            
            let temp = [];
            
            for (i = 0; i < shopList.length; i++){

                let shop = shopList[i].shop;
                temp.push(shop);
                
            }

            this.setState({shopArray: temp});

        }

    }

    async refreshShopList(){

        this.setState({refreshing: true});

        let json = await vendor_getShopList()

        this.setState({refreshing: false});
        
        if (json.result == true){
            
            let shopList = json.message;
            
            let temp = [];
            
            for (i = 0; i < shopList.length; i++){

                let shop = shopList[i].shop;
                temp.push(shop);
                
            }
      
            this.setState({shopArray: temp});

        }

    }

    onAddButton() {
        this.props.navigation.navigate("AddShopScreen")
    }

    onPressItem(item) {
        
        AppManager.getInstance.selectedShopInfo = item
        this.props.navigation.navigate("ShopHomeScreen");
        
    }

    render() {

        return (

            <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 1}}>
   
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <FlatList
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        title="Refreshing..."
                        onRefresh={this.refreshShopList}
                        />
                    }
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
                                            <View style={{width: 60, height: 60, borderRadius: 30, borderWidth: 0.3, borderColor: 'gray', marginLeft: 20}}>
                                                {item.preview != null ? (
                                                    <Image source={{uri: imageLocation}}
                                                        style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 30}} />
                                                ):(
                                                    <Image style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 30}} />
                                                )}                           
                                            </View>
                                            <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginLeft: 20}}>{item.name}</Text>
                                            <Image source={require('../../Assets/Images/shoplist_arrow_icon.png')}
                                                    style={{width: 13, height: 18, resizeMode: 'contain', position: 'absolute', right: 20}} />
                                        </View>
                                </TouchableHighlight>
                    }}
                />

                {/* <ImageBackground source={require('../../Assets/Images/shoplist_bottom_bg.png')}
                                    style={{position: 'absolute', bottom: 0, width: '100%', height: 130, alignItems: 'center'}}>
                    <TouchableOpacity style={{width: 45, height: 45, alignItems: 'center', justifyContent: 'center', marginTop: 35}}
                        onPress={this.onAddButton}>
                        <Image source={require('../../Assets/Images/shoplist_plus_button.png')}
                               style={{width: 60, height: 60}} />
                    </TouchableOpacity>
                </ImageBackground> */}


                <TouchableOpacity style={{position: 'absolute', bottom: 20, width: 70, height: 70, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', right: 20,
                                    borderRadius: 35, borderColor: 'gray', borderWidth: 0.3, shadowColor: 'gray', shadowOpacity: 0.2, shadowRadius: 5}}
                    onPress={this.onAddButton}>
                    <Image source={require('../../Assets/Images/shoplist_plus_button.png')}
                            style={{width: 60, height: 60}} />
                </TouchableOpacity>
    
            </View>

        );
    }
}