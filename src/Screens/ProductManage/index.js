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
import Search from 'react-native-search-box';
import Styles from './styles';
import ModalSelector from 'react-native-modal-selector'

const deviceWidth = Dimensions.get("window").width;

export default class ProductManage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            categoryArray: [],
            selectedCategory: 'All',
            selectedCategoryId: -1,

            keyword: '',

            isCategoryFieldEnabled: true,

            productArray: []
        })

        this.onAddButton = this.onAddButton.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        // this.categoryPicked = this.categoryPicked.bind(this);

    }

    async componentDidMount() {

        //get list of category

        this.setState({loading: true})

        let formData = new FormData();
        formData.append('shop', AppManager.getInstance.selectedShopInfo.id);

        let response = await vendor_get_shop_category(formData)

        this.setState({loading: false})

        if (response.length > 0){

            let temp = []

            temp.push({key: -1, label: 'All'})
            for (let i = 0; i < response.length; i++) { 

                let item = {key: response[i].category.id, label: response[i].category.name}

                temp.push(item);
            } 

            this.setState({categoryArray: temp});
            

        }else{
            this.setState({isCategoryFieldEnabled: false})
        }

        //get products

        this.setState({loading: true})

        formData = new FormData();
        formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);

        response = await vendor_get_products(formData)

        this.setState({loading: false})

        if (response.result == true){

            this.setState({productArray: response.message});

        }

    }

    async searchProducts(){
        
        if (this.state.selectedCategoryId != -1){

            let formData = new FormData();
            formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);
            formData.append('category', this.state.selectedCategoryId);
            formData.append('query', this.state.keyword);

            let response = await vendor_get_products(formData)
            
            // let temp = []
            // for (let i = 0; i < this.state.productArray.length; i++){
            
            //     if ((this.state.productArray[i].variant.product.categoryId == this.state.selectedCategoryId) && 
            //         (this.state.productArray[i].variant.product.name.toLowerCase().includes(this.state.keyword.toLowerCase()))){
                        
            //             temp.push(this.state.productArray[i])

            //     }

            // }

            this.setState({productArray: response.message})

        }else{
            
            // this.setState({selectedCategoryId: 2})

            let formData = new FormData();
            formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);
            formData.append('query', this.state.keyword);

            let response = await vendor_get_products(formData)

            
            // let temp = []
            // for (let i = 0; i < this.state.productArray.length; i++){
            
            //     if (this.state.productArray[i].variant.product.name.toLowerCase().includes(this.state.keyword.toLowerCase())){

            //         temp.push(this.state.productArray[i])

            //     }

            // }

            this.setState({productArray: response.message})

        }

    }

    async loadMoreProducts(){
        
        let lastProductId = this.state.productArray[this.state.productArray.length - 1].id

        if (this.state.selectedCategoryId != -1){

            let formData = new FormData();
            formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);
            formData.append('category', this.state.selectedCategoryId);
            formData.append('query', this.state.keyword);
            formData.append('from', lastProductId);

            let response = await vendor_get_products(formData)

            let temp = this.state.productArray.concat(response.message)

            this.setState({productArray: temp})

        }else{
            
            // this.setState({selectedCategoryId: 2})

            let formData = new FormData();
            formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id);
            formData.append('query', this.state.keyword);
            formData.append('from', lastProductId);

            let response = await vendor_get_products(formData)

            let temp = this.state.productArray.concat(response.message)

            this.setState({productArray: temp})

        }

    }

    onAddButton(){

        this.props.navigation.navigate("AddProductScreen")

    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>
                <View style={{width: '100%', height: 70, alignItems: 'center'}}>

                    {/* <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}}>SELECT CATEGORY</Text> */}

                    <View style={Styles.TextInputContainer}>

                        <ModalSelector
                            data={this.state.categoryArray}
                            initValue="Select Category"
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
                            onChange={(option)=>{ 
                                this.setState({selectedCategory: option.label, selectedCategoryId: option.key})
                                this.searchProducts()
                            }}>

                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Select Category"
                                value={this.state.selectedCategory}
                                autoCapitalize='none'
                                editable={this.state.isCategoryFieldEnabled} 
                                selectTextOnFocus={this.state.isCategoryFieldEnabled}
                                underlineColorAndroid='transparent'
                            />

                        </ModalSelector>

                    </View>

                </View>


                <View style={{width: '100%'}}>

                    <Search 
                        ref="search_box"
                        onChangeText={(text) => {
                            this.setState({keyword: text})
                            this.searchProducts()
                        }}
                        onCancel={ () => {
                            this.setState({keyword: ''})
                            this.searchProducts()
                        }}
                        onDelete={ () => {
                            this.setState({keyword: ''})
                            this.searchProducts()
                        }}
                        style={{marginTop: 50}}
                        autoCapitalize={false}
                    />

                </View>

                <GridView
                    itemDimension={130}
                    items={this.state.productArray}
                    style={Styles.gridView}
                    onEndReached={info => this.loadMoreProducts()}
                    renderItem={item => {

                        let imageLocation = "http://ls.antonioantek.com/images/" + item.variant.preview + ".jpg"

                        if (item.variant.preview == null){
                            return (
                                <View style={Styles.itemViewContainer} source={{uri: imageLocation}}   imageStyle={{ borderRadius: 5 }}>
                                    <Text style={Styles.itemName}>{item.variant.product.name}</Text>
                                </View>
                            )
                        }else{
                            return (
                                <ImageBackground style={Styles.itemImageContainer} source={{uri: imageLocation}}   imageStyle={{ borderRadius: 5 }}>
                                    <Text style={Styles.itemName}>{item.variant.product.name}</Text>
                                </ImageBackground>
                            )
                        }
                        
                    }}
                />

                <TouchableOpacity style={{width: '90%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', 
                                       marginBottom: 10, marginTop: 10}} onPress={this.onAddButton}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Add Product</Text>
                </TouchableOpacity>

            </SafeAreaView>
        );
    }
}