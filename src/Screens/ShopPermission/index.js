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
    RefreshControl,
    Alert
} from 'react-native';

import { EventRegister } from 'react-native-event-listeners'
import { vendor_get_shop_permission, vendor_update_shop_permission } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';


export default class ShopPermission extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            permissionArray: [],
            refreshing: false
        })

        this.onInviteButton = this.onInviteButton.bind(this);
        this.onRemoveButton = this.onRemoveButton.bind(this);
    }

    async componentDidMount() {

        this.setState({loading: true})

        let formData = new FormData();
        formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);

        let response = await vendor_get_shop_permission(formData)

        this.setState({loading: false})

        if (response.result == true){
            this.setState({permissionArray: response.message})
        }else{
            this.props.navigation.goBack();
        }

        EventRegister.addEventListener('getShopPermission', (data) => {
            this.fetchShopPermission();
        })

    }

    async fetchShopPermission(){

        let formData = new FormData();
        formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);

        let response = await vendor_get_shop_permission(formData)

        if (response.result == true){
            this.setState({permissionArray: response.message})
        }else{
            this.props.navigation.goBack();
        }

    }

    onInviteButton() {
        this.props.navigation.navigate("VendorInviteScreen")
    }

    onRemoveButton(item) {

        Alert.alert(
            '',
            'Do you really want to remove ' + item.vendor.email + ' ?',
            [
                {text: 'Cancel', onPress: () => { 
                
                }},

                {text: 'YES', onPress: () => { 
                    
                    this.removeVendor(item)
                
                }}

            ],
            { cancelable: false }
          )       
        
    }

    async removeVendor(item){
        
        let formData = new FormData()

        formData.append('relationship', item.id)
        formData.append('rank', 'remove')

        let response = await vendor_update_shop_permission(formData)

        if (response.result == true){
            this.fetchShopPermission()
        }

    }

    render() {

        return (

            <View style={{flexDirection: 'column', backgroundColor: 'white', flex: 1, alignItems: 'center'}}>
   
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <FlatList
                    ItemSeparatorComponent={ () => <View style={ { width: '100%', height: 0.3, backgroundColor: 'gray' } } /> }
                    style={{flex: 1, width: '100%', height: '100%', marginBottom: 32}}
                    data={this.state.permissionArray}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, separators}) => {    
                        return <TouchableHighlight
                                    onShowUnderlay={separators.highlight}
                                    onHideUnderlay={separators.unhighlight}
                                    style={{backgroundColor: '#ECECEC', height: 80, width: '100%'}}>
                                        <View style={{backgroundColor: '#ECECEC', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                            
                                            <Text style={{fontSize: 16, fontWeight: '600', color: 'black', marginLeft: 20}}>{item.vendor.email}</Text>

                                            <TouchableOpacity style={{ position: 'absolute', right: 20, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', 
                                                            marginBottom: 10, marginTop: 10}} onPress={ () => this.onRemoveButton(item)}>
                                                <Image source={require('../../Assets/Images/remove_button.png')}
                                                        style={{width: 30, height: 30 }}/>
                                            </TouchableOpacity>

                                            
                                        </View>

                                        
                                </TouchableHighlight>
                    }}
                />


                <TouchableOpacity style={{width: '90%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', 
                                       marginBottom: 10, marginTop: 10}} onPress={this.onInviteButton}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Invite</Text>
                </TouchableOpacity>
    
            </View>

        );
    }
}