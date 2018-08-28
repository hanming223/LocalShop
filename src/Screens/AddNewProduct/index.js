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
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    TouchableHighlight,
    Alert, 
    ScrollView
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { vendor_get_brands, vendor_get_sub_catgegory } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Picker from 'react-native-picker';
import Styles from './styles';
import {KeyboardManager, PreviousNextView} from 'react-native-keyboard-manager'

import { ImagePicker } from 'react-native-image-picker';


const deviceWidth = Dimensions.get("window").width;

export default class AddNewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            brandArray: null,
            categoryArray: null,

            thumbnailURI: null,
            thumbnailEncodedString: null,
            imageURIArray: [],
            imageEncodedStringArray: [],

            productName: '',
            productCategory: '',
            productCategoryId: '',
            productDescription: '',
            productPrice: '',
            productColor: '',
            productCount: '',
            productBrand: '',
            productBrandId: '',

            items2: [
                {
                    label: 'Football',
                    value: 'football',
                },
                {
                    label: 'Baseball',
                    value: 'baseball',
                },
                {
                    label: 'Hockey',
                    value: 'hockey',
                },
            ],

        })

        this.showCategoryPicker = this.showCategoryPicker.bind(this);
        this.showBrandPicker = this.showBrandPicker.bind(this);

        this.onAddImageButton = this.onAddImageButton.bind(this);
        this.onThumbnailButton = this.onThumbnailButton.bind(this);

        this.onAddButton = this.onAddButton.bind(this);
        
    }

    async componentDidMount() {

        this.getPredefinedValues()
        
        
    }

    async getPredefinedValues(){

        //get brands

        this.setState({loading: true});

        let response = await vendor_get_brands()

        if (response.length > 0){
            
            this.setState({brandArray: response});
            
        }else{

            this.setState({loading: false});
            this.props.navigation.goBack();

        }

        // get categories 

        response = await vendor_get_sub_catgegory()

        if (response.message.length > 0){
            
            this.setState({loading: false});
            this.setState({categoryArray: response.message});
            // console.log('ttt', response.message)

        }else{

            this.setState({loading: false});
            this.props.navigation.goBack();

        }

    }

    showCategoryPicker() {

        
        let temp = []
        for (let i = 0; i < this.state.categoryArray.length; i++){
            temp.push(this.state.categoryArray[i].name)
        }

        Picker.init({
            pickerData: temp,
            pickerTitleText: "Please Select Category",
            pickerConfirmBtnText: "Confirm",
            pickerCancelBtnText: "Cancel",
            pickerRowHeight: 32,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this.setState({productCategory: pickedValue})
                this.setState({productCategoryId: this.state.categoryArray[pickedIndex].id})
            },
            onPickerCancel: pickedValue => {
                console.log('category', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('category', pickedValue);
            }
        });
        Picker.show();
    }

    showBrandPicker() {

        
        let temp = []
        for (let i = 0; i < this.state.brandArray.length; i++){
            temp.push(this.state.brandArray[i].name)
        }

        Picker.init({
            pickerData: temp,
            pickerTitleText: "Please Select Brand",
            pickerConfirmBtnText: "Confirm",
            pickerCancelBtnText: "Cancel",
            pickerRowHeight: 32,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this.setState({productBrand: String(pickedValue)})
                this.setState({productBrandId: this.state.brandArray[pickedIndex].id})
            },
            onPickerCancel: pickedValue => {
                console.log('category', pickedValue);
            },
            onPickerSelect: pickedValue => {
                console.log('category', pickedValue);
            }
        });
        Picker.show();
    }


    async onAddButton(){

        if (this.state.productName == ''){

            Alert.alert(
                'Oops!',
                'Please enter all fields.',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )
            return
        }

        this.setState({loading: true});
        
        //upload images

        this.setState({loading: false});

        if (response.result == null){

        }else{

            

        }

    }

    onAddImageButton(){

        var options = {
            title: 'Select Image',
            allowsEditing: true,
            mediaType: 'photo',
            quality: 0.5,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                let temp = this.state.imageURIArray
                temp.push(source)
                this.setState({imageURIArray: temp})

                temp = this.state.imageEncodedStringArray
                temp.push('data:image/jpeg;base64,' + response.data)
                this.setState({imageEncodedStringArray: temp})

            }
        });

    }

    onThumbnailButton(){

        var options = {
            title: 'Select Thumbnail',
            allowsEditing: true,
            mediaType: 'photo',
            quality: 0.5,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({thumbnailURI: source})
                this.setState({thumbnailEncodedString: 'data:image/jpeg;base64,' + response.data})

            }
        });

    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <ScrollView style={{width: '100%'}}>
                
                    <PreviousNextView style={{marginLeft: 15, marginRight: 15, height: '100%', alignItems: 'center', marginTop: 20}}>

                        {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>You are the first to sell this product.</Text> */}

                        <Text style={{fontSize: 16, fontWeight: 'normal', color: 'black'}}>Shop Thumbnail</Text>

                        <TouchableOpacity style={{width: 160, height: 160, borderRadius: 80, marginTop: 20}} onPress={this.onThumbnailButton}>

                            <Image source={this.state.thumbnailURI} style={{width: '100%', height: '100%', resizeMode: 'cover', borderWidth: 1, borderColor: 'gray'}} />
                        
                        </TouchableOpacity>

                        <Text style={{fontSize: 14, fontWeight: 'normal', color: 'black', marginTop: 10}}>Please add as much photos as possible. So users can see every details.</Text>
                    
                        <View style={{width: '100%', height: 90, borderColor: 'black', borderWidth: 1, marginTop: 10}}>

                            <FlatList
                                style={{flex: 1, width: '100%', height: '100%'}}
                                data={this.state.imageURIArray}
                                horizontal={true}
                                renderItem={({item}) => {    
                                    return <TouchableHighlight
                                        onPress={() => this.onPressItem(item)}
                                        style={{height: 90, width: 92}}>
                                            <Image source={item} style={{width: 90, height: 90, resizeMode: 'cover'}} />
                                    </TouchableHighlight>
                                }}
                            />

                        </View>

                        <TouchableOpacity style={{width: 80, height: 40, borderRadius: 80, marginTop: 5, alignSelf: 'flex-end'}} onPress={this.onAddImageButton}>

                            <Text style={{fontSize: 16, fontWeight: 'normal', color: 'black'}}>Add Image</Text>

                        </TouchableOpacity>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Product Name"
                                onChangeText={(text) => this.setState({productName: text})}
                                autoCapitalize='none'
                                value={this.state.productName}
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Category"
                                onChangeText={(text) => this.setState({productCategory: text})}
                                value={this.state.productCategory}
                                autoCapitalize='none'
                                onFocus={this.showCategoryPicker.bind(this)}
                            />
                        </View>

                        <View style={Styles.TextInputDescriptionContainer}>
                            <TextInput
                                style={{height: '100%', width: '100%', paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingBottom: 15}}
                                placeholder="Description"
                                onChangeText={(text) => this.setState({productDescription: text})}
                                value={this.state.productDescription}
                                autoCapitalize='none'
                                multiline={true}
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Price"
                                onChangeText={(text) => this.setState({productPrice: text})}
                                value={this.state.productPrice}
                                autoCapitalize='none'
                                keyboardType='decimal-pad'
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Color"
                                onChangeText={(text) => this.setState({productColor: text})}
                                value={this.state.productColor}
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Count"
                                onChangeText={(text) => this.setState({productCount: text})}
                                value={this.state.productCount}
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Brand"
                                value={this.state.productBrand}
                                autoCapitalize='none'
                                onFocus={this.showBrandPicker.bind(this)}
                            />
                        </View>

                        <TouchableOpacity style={{width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 30, marginBottom: 30}}
                                onPress={this.onAddButton}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Add</Text>
                        </TouchableOpacity>

                    </PreviousNextView>
                </ScrollView>

            </SafeAreaView>
        );
    }
}