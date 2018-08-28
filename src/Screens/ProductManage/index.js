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

import { vendor_get_shop_category, vendor_get_products } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import GridView from 'react-native-super-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import Picker from 'react-native-picker';
import Search from 'react-native-search-box';
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;

export default class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            categoryArray: [],
            categoryId: '',
            isCategoryFieldEnabled: true,
            productArray: []
        })

        this.onAddButton = this.onAddButton.bind(this);
        this.categoryPicked = this.categoryPicked.bind(this);

    }

    async componentDidMount() {

        //get list of category

        this.setState({loading: true})

        let formData = new FormData();
        formData.append('shop', AppManager.getInstance.selectedShopInfo.id);

        let response = await vendor_get_shop_category(formData)

        this.setState({loading: false})

        if (response.length > 0){

            let tempArray = []
            let tempcategoryNameData = []

            for (let i = 0; i < response.length; i++) { 
                tempArray.push(response[i]);
                tempcategoryNameData.push(response[i].category.name);
            } 

            this.setState({categoryArray: tempArray});
            this.setState({categoryNameData: tempcategoryNameData});

        }else{
            this.setState({isCategoryFieldEnabled: false})
        }

    }

    async searchProducts(){

        alert(this.searchBox.searchBar.Text);

    }

    onAddButton(){

        this.props.navigation.navigate("AddProductScreen")

    }

    categoryPicked(pickedValue, pickedIndex){

        this.setState({category: String(pickedValue)})
        this.setState({categoryId: this.state.categoryArray[pickedIndex].id});

        this.getProducts()
    }

    async getProducts(){

        this.setState({loading: true})

        let formData = new FormData();
        formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);

        let response = await vendor_get_products(formData)

        this.setState({loading: false})

        let temp = []
        for (let i = 0; i < response.length; i++) { 
            temp.push(response[i]);
        } 

        this.setState({productArray: temp});

    }

    showAreaPicker() {
        Picker.init({
            pickerData: this.state.categoryNameData,
            pickerTitleText: "Please Select Category",
            pickerConfirmBtnText: "Confirm",
            pickerCancelBtnText: "Cancel",
            pickerRowHeight: 32,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('category', pickedValue);
                this.categoryPicked(pickedValue, pickedIndex);
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('category', pickedValue);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('category', pickedValue);
            }
        });
        Picker.show();
    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>
                <View style={{width: '100%', height: 100, alignItems: 'center'}}>

                    <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>SELECT CATEGORY</Text>

                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Select Category"
                            value={this.state.category}
                            autoCapitalize='none'
                            onFocus={this.showAreaPicker.bind(this)}
                            editable={this.state.isCategoryFieldEnabled} 
                            selectTextOnFocus={this.state.isCategoryFieldEnabled}
                        />
                    </View>

                </View>


                <View style={{width: '100%'}}>

                    <Search 
                        ref="search_box"
                        style={{marginTop: 50}}
                    />

                </View>

                <TouchableOpacity style={{width: '90%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', 
                                        position: 'absolute', bottom: 10}}
                        onPress={this.onAddButton}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Add Product</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
}