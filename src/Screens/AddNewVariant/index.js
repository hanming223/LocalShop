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
import { vendor_get_brands, vendor_get_sub_catgegory, vendor_get_suggested_details, vendor_add_image_relationship, vendor_upload_multiple_images,
         vendor_set_product_preview, vendor_upload_image, vendor_get_detail_values, vendor_add_detail_values, vendor_add_new_variant } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';
import {KeyboardManager, PreviousNextView} from 'react-native-keyboard-manager'
import ModalSelector from 'react-native-modal-selector'
import Dialog from "react-native-dialog";
import ImagePicker from 'react-native-image-picker';

export default class AddNewVariant extends Component {
    constructor(props) {
        super(props);
        this.state = ({

            loading: false,
            isDialogVisible: false,
           
            suggestedDetailArray: [],
            suggestedDetailValueArray: [],
            selectedDetailArray: [],

            thumbnailURI: null,
            thumbnailEncodedString: null,
            imageURIArray: [],
            imageEncodedStringArray: [],

            productId: null,
         
            productColor: '',
            productModel: '',

            detailValues: [],
            detailParam: {},

            ownValue: '',
            currentDetailIndex: null,

        })

        this.onAddImageButton = this.onAddImageButton.bind(this);
        this.onThumbnailButton = this.onThumbnailButton.bind(this);

        this.onAddOwnValueButton = this.onAddOwnValueButton.bind(this);
        this.onCancelOwnValueButton = this.onCancelOwnValueButton.bind(this);
        this.onAddButton = this.onAddButton.bind(this);
        
    }

    async componentDidMount() {

        this.setState({productId: this.props.navigation.getParam('productId')})

        this.getPredefinedValues()
        
        
    }

    async getPredefinedValues(){

        // get suggested details

        this.setState({loading: true});

        let formData = new FormData();
        formData.append('catId', AppManager.getInstance.selectedShopInfo.category);

        let response = await vendor_get_suggested_details(formData)

        if (response.result == true){
            
            let suggestedDetailTemp = []
            let selectedDetailTemp = []
            let suggestedDetailValueTemp = []

            for (let i = 0; i < response.message.length; i++){

                suggestedDetailTemp.push(response.message[i].detail)
                selectedDetailTemp.push({key: '', label: ''})
                
                //get detail values

                formData = new FormData();
                formData.append('detail', response.message[i].detail.id);

                let res = await vendor_get_detail_values(formData)
                
                if (res.result == true){

                    let tempValues = []
                    for (let j = 0; j < res.message.length; j++){
                        let item = {key: res.message[j].id, label: res.message[j].value}
                        tempValues.push(item)
                    }
                    tempValues.push({key: -1, label: "Add my own value"})
                    suggestedDetailValueTemp.push(tempValues)

                }else{
                    this.setState({loading: false});
                    this.props.navigation.goBack();
                }

            }
            
            this.setState({loading: false});

            this.setState({selectedDetailArray: selectedDetailTemp});
            this.setState({suggestedDetailArray: suggestedDetailTemp});
            this.setState({suggestedDetailValueArray: suggestedDetailValueTemp})


        }else{

            this.setState({loading: false});
            this.props.navigation.goBack();

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
                temp.push('data:image/png;base64,' + response.data)
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

    async onAddOwnValueButton(){

        // this.setState({isDialogVisible: false})
        // this.setState({loading: true})

        // let formData = new FormData()
        // formData.append('detail', this.state.suggestedDetailArray[this.state.currentDetailIndex].id)
        // formData.append('value', this.state.ownValue)

        // let response = await vendor_add_detail_values(formData)

        // if (response.result == true){

        //     let temp = this.state.selectedDetailArray
        //     temp[this.state.currentDetailIndex] = {key: response.message, label: this.state.ownValue}
        //     console.log("qqqq", temp)
        //     this.setState({selectedDetailArray: temp})

        // }

        // this.setState({loading: false})

        this.setState({isDialogVisible: false})
            
        let temp = this.state.selectedDetailArray
        temp[this.state.currentDetailIndex] = {key: -1, label: this.state.ownValue}
        this.setState({selectedDetailArray: temp})

    }

    onCancelOwnValueButton(){
        this.setState({isDialogVisible: false})
    }

    async onAddButton(){

        if (this.state.thumbnailURI == null){
            Alert.alert(
                'Oops!',
                'Please add thumbnail.',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )
            return
        }

        if (this.state.productColor == '' || this.state.productModel == ''){

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

        for (let i = 0; i < this.state.selectedDetailArray.length; i++){

            if (this.state.selectedDetailArray[i].label == ''){
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

        }

        
        this.setState({loading: true});

        //Add own values

        for (let i = 0; i < this.state.selectedDetailArray.length; i++){

            if (this.state.selectedDetailArray[i].key == -1){

                let formData = new FormData()
                formData.append('detail', this.state.suggestedDetailArray[i].id)
                formData.append('value', this.state.selectedDetailArray[i].label)

                let response = await vendor_add_detail_values(formData)

                if (response.result == true){

                    let temp = this.state.selectedDetailArray
                    temp[i] = {key: response.message, label: this.state.selectedDetailArray[i].label}
                    this.setState({selectedDetailArray: temp})

                }else{

                    this.setState({loading: false});
                    return

                }

            }

        }

        //add product

        let formData = new FormData()

        formData.append('color', this.state.productColor)
        formData.append('modelName', this.state.productModel)
        formData.append('product', this.state.productId)

        let detailArray = []
        for (let i = 0; i < this.state.selectedDetailArray.length; i++){

            detailArray.push({'detId': this.state.suggestedDetailArray[i].id, 'detParamId': this.state.selectedDetailArray[i].key})

        }

        formData.append('details', detailArray)

        console.log('vvv', formData)

        let response = await vendor_add_new_variant(formData)

        let productId = null
        if (response.result == true){

            productId = response.message

        }else{
            this.setState({loading: false});
            return
        }
        

        //upload thumbnail

        formData = new FormData();

        formData.append('product', productId)
        formData.append('image', this.state.thumbnailEncodedString)
        response = await vendor_set_product_preview(formData)

        if (response.result == true){
            
            if (this.state.imageEncodedStringArray.length == 0){

                Alert.alert(
                    'Success!',
                    'Variant added successfully.',
                    [
                        {text: 'OK', onPress: () => {
                            this.setState({loading: false});
                            this.props.navigation.goBack(AppManager.getInstance.addProductScreenKey);
                        }},
                    ],
                    { cancelable: false }
                )

                return

            }

            //upload multiple images
            
            formData = new FormData();

            formData.append('images', this.state.imageEncodedStringArray.toString());
            formData.append('target', productId);
            formData.append('type', 1);

            response = await vendor_upload_multiple_images(formData);

            if (response.result == true){

                Alert.alert(
                    'Success!',
                    'Variant added successfully..',
                    [
                        {text: 'OK', onPress: () => {
                            this.setState({loading: false});
                            this.props.navigation.goBack(AppManager.getInstance.addProductScreenKey);
                        }},
                    ],
                    { cancelable: false }
                )

            }

        }else{
            this.setState({loading: false});
        }

    }

    render() {

        return (
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <ScrollView style={{width: '100%'}}>
                
                    <PreviousNextView style={{marginLeft: 15, marginRight: 15, height: '100%', alignItems: 'center', marginTop: 20}}>

                        {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>You are the first to sell this product.</Text> */}

                        <Text style={{fontSize: 16, fontWeight: 'normal', color: 'black'}}>Product Thumbnail</Text>

                        <TouchableOpacity style={{width: 160, height: 160, borderRadius: 80, marginTop: 20}} onPress={this.onThumbnailButton}>

                            <Image source={this.state.thumbnailURI} style={{width: '100%', height: '100%', resizeMode: 'cover', borderWidth: 1, borderRadius: 10, borderColor: 'gray'}} />
                        
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
                                placeholder="Color"
                                onChangeText={(text) => this.setState({productColor: text})}
                                value={this.state.productColor}
                                autoCapitalize='none'
                                underlineColorAndroid='transparent'
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Model Name"
                                onChangeText={(text) => this.setState({productModel: text})}
                                value={this.state.productModel}
                                autoCapitalize='none'
                                underlineColorAndroid='transparent'
                            />
                        </View>

                        {this.state.suggestedDetailArray.map((item, index) => {
                            return(
                                
                                <View style={Styles.TextInputContainer}>

                                    <ModalSelector
                                        data={this.state.suggestedDetailValueArray[index]}
                                        initValue=""
                                        overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
                                        accessible={true}
                                        scrollViewAccessibilityLabel={'Scrollable options'}
                                        cancelButtonAccessibilityLabel={'Cancel Button'}
                                        onChange={(option)=>{ 

                                            if (option.key == -1){
                                                //show own value input dialog
                                                this.setState({currentDetailIndex: index})
                                                this.setState({isDialogVisible: true})

                                            }else{
                                                let temp = this.state.selectedDetailArray
                                                temp[index] = option
                                                this.setState({selectedDetailArray: temp})}
                                            }
                                            
                                        }>
                                        
                                        <TextInput
                                            style={Styles.TextInputStyle}
                                            placeholder={item.name}
                                            value = {this.state.selectedDetailArray[index].label.toString()}
                                            autoCapitalize='none'
                                            onChangeText={(text) =>{
                                              

                                            }}
                                            underlineColorAndroid='transparent'
                                        />

                                    </ModalSelector>

                                </View>

                            );
                        })}


                        <TouchableOpacity style={{width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 30, marginBottom: 30}}
                                onPress={this.onAddButton}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Add</Text>
                        </TouchableOpacity>

                    </PreviousNextView>
                </ScrollView>

                <Dialog.Container visible={this.state.isDialogVisible}>
                    <Dialog.Title>Please enter your own value.</Dialog.Title>
                    <Dialog.Input onChangeText={(text) => {
                                this.setState({ownValue: text})
                            }} />
                    <Dialog.Button label="Cancel" onPress={this.onCancelOwnValueButton} />
                    <Dialog.Button label="Add" onPress={this.onAddOwnValueButton} />
                </Dialog.Container>

            </SafeAreaView>
        );
    }
}