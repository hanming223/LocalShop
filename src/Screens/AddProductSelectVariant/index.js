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
import Dialog from "react-native-dialog";
import { vendor_add_product_relationship, vendor_get_product_variants } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';


export default class AddProductSelectVariant extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            refreshing: false,
            variantArray: [],
            isDialogVisible: false,
            price: 0,
            count: 0,
            selectedVariant: null
        })

        this.onPressItem = this.onPressItem.bind(this)

        this.onAddButton = this.onAddButton.bind(this)
        this.onCancelButton = this.onCancelButton.bind(this)

    }

    async componentDidMount() {

        this.setState({loading: true})

        let formData = new FormData();
        formData.append('productId', this.props.navigation.getParam('productId'));
        let response = await vendor_get_product_variants(formData)

        this.setState({loading: false})

        if (response.result == true){

            let temp = []
            for (let i = 0; i < response.message.length; i++){

                temp.push(response.message[i])

            }

            this.setState({variantArray: temp})

        }else{

            this.props.navigation.goBack()

        }

    }

    onPressItem(item) {
        
        this.setState({selectedVariant: item})
        this.setState({isDialogVisible: true})
        
    }

    async onAddButton(){

        this.setState({isDialogVisible: false})

        let formData = new FormData();
        formData.append('product', this.state.selectedVariant.id);
        formData.append('price', this.state.price);
        formData.append('count', this.state.count);
        formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);

        this.setState({loading: true});

        let response = await vendor_add_product_relationship(formData);

        this.setState({loading: false});

        if (response.result == true){

            Alert.alert(
                'Success!',
                'Variant added successfully.',
                [
                  {text: 'OK', onPress: () => {
                        this.props.navigation.goBack(AppManager.getInstance.addProductScreenKey);
                    }},
                ],
                { cancelable: false }
            )

        }else{

            Alert.alert(
                'Oops!',
                'Something went wrong.',
                [
                  {text: 'OK', onPress: () => null},
                ],
                { cancelable: false }
            )
            
        }

    }

    async onCancelButton(){
        this.setState({isDialogVisible: false})
    }

    render() {

        return (

            <View style={{flexDirection: 'column', flex: 1}}>
   
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black', textAlign: 'center', marginTop: 10, marginBottom: 10}}>
                    There are some variants of this product.
                </Text>

                <FlatList
                    ItemSeparatorComponent={ () => <View style={ { width: '100%', height: 0.3, backgroundColor: 'gray' } } /> }
                    style={{flex: 1, width: '100%'}}
                    data={this.state.variantArray}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, separators}) => {    
                        // let imageLocation = "http://ls.antonioantek.com/images/" + item.preview + ".jpg"
                        return <TouchableHighlight
                                onPress={() => this.onPressItem(item)}
                                onShowUnderlay={separators.highlight}
                                onHideUnderlay={separators.unhighlight}
                                style={{backgroundColor: 'red', height: 80, width: '100%'}}>
                                    <View style={{backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                        <View style={{width: 60, height: 60, borderRadius: 30, borderWidth: 0.3, borderColor: 'gray', marginLeft: 20}}>
                                            
                                                {/* <Image source={{uri: imageLocation}}
                                                    style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 30}} /> */}
                                                                         
                                        </View>
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
    
                <Dialog.Container visible={this.state.isDialogVisible}>
                    <Dialog.Title>Please enter price and count.</Dialog.Title>
                    <Dialog.Input placeholder='price' keyboardType='decimal-pad'
                                  onChangeText={(text) => this.setState({price: text})}
                                  value={this.state.price} />
                    <Dialog.Input placeholder='count' keyboardType='decimal-pad'
                                  onChangeText={(text) => this.setState({count: text})}
                                  value={this.state.count} />
                    <Dialog.Button label="Cancel" onPress={this.onCancelButton} />
                    <Dialog.Button label="Add" onPress={this.onAddButton} />
                </Dialog.Container>

            </View>

        );
    }
}