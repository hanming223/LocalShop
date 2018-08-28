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

import { vendor_get_similar_products } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Picker from 'react-native-picker';
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            productName: false
        })

        // this.showAreaPicker = this.showAreaPicker.bind(this);
        // this.categoryPicked = this.categoryPicked.bind(this);
        this.onAddButton = this.onAddButton.bind(this);
        
    }

    async componentDidMount() {

        // this.setState({loading: true});
        // let response = await vendor_get_mother_category()
        // this.setState({loading: false});
        
        // let temp1 = []
        // let temp2 = []
        // if (response.result == true){

        //     for (let i = 0; i < response.message.length; i++){

        //         temp1.push(response.message[i].name);
        //         temp2.push(response.message[i]);

        //     }

        //     this.setState({categoryData: temp1, categoryArray: temp2});
            
        // }else{

        //     this.props.navigation.goBack();

        // }

    }

    // showAreaPicker() {
    //     Picker.init({
    //         pickerData: this.state.categoryData,
    //         pickerTitleText: "Please Select Category",
    //         pickerConfirmBtnText: "Confirm",
    //         pickerCancelBtnText: "Cancel",
    //         pickerRowHeight: 32,
    //         onPickerConfirm: pickedValue => {
    //             console.log('category', pickedValue);
    //             this.categoryPicked(pickedValue);
    //         },
    //         onPickerCancel: pickedValue => {
    //             console.log('category', pickedValue);
    //         },
    //         onPickerSelect: pickedValue => {
    //             console.log('category', pickedValue);
    //         }
    //     });
    //     Picker.show();
    // }

    // categoryPicked(pickedValue){

    //     this.setState({categoryName: String(pickedValue)})

    //     for (let i = 0; i < this.state.categoryArray.length; i++){

    //         if (this.state.categoryArray[i].name == pickedValue){
    //             this.setState({categoryId: this.state.categoryArray[i].id});
    //             continue;
    //         }

    //     }

    // }

    async onAddButton(){

        if (this.state.productName == ''){

            Alert.alert(
                'Oops!',
                'Please enter product name.',
                [
                  {text: 'OK', onPress: () => true},
                ],
                { cancelable: false }
              )
            return
        }

        // this.setState({loading: true});

        let formData = new FormData();
        formData.append('name', this.state.productName);

        let response = await vendor_get_similar_products(formData);

        // this.setState({loading: false});

        if (response.result == null){

            this.props.navigation.navigate('AddNewProductScreen');

        }else{

            AppManager.getInstance.similarProductArray = []
            for (let i = 0; i < response.result.length; i++){

                AppManager.getInstance.similarProductArray.push(response.result[i])

            }
            
            this.props.navigation.navigate('SimilarProductScreen')

        }

    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <View style={{width: '90%', height: '100%', alignItems: 'center', marginTop: 20}}>

                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Insert name of the product"
                            onChangeText={(text) => this.setState({productName: text})}
                            autoCapitalize='none'
                            value={this.state.productName}
                        />
                    </View>

                    {/* <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Category"
                            onChangeText={(text) => this.setState({categoryName: text})}
                            value={this.state.categoryName}
                            autoCapitalize='none'
                            onFocus={this.showAreaPicker.bind(this)}
                        />
                    </View> */}

                    <TouchableOpacity style={{width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 30}}
                            onPress={this.onAddButton}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Add</Text>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        );
    }
}