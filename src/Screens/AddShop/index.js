import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import { EventRegister } from 'react-native-event-listeners'
import ModalSelector from 'react-native-modal-selector'

import {
    Alert,
    StyleSheet,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    Text,
    View,
    Dimensions, 
    TextInput,
    Keyboard
} from 'react-native';

import { vendor_addshop, vendor_get_mother_category } from "../../Components/Api";
import Styles from './styles';
import AppManager from '../../Components/AppManager';
import AddressCompleteModal from '../../Screens/AddressCompleteModal';

export default class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: "",
            address: "",
            categoryId: "",
            categoryArray: [],
            loading: false,
            isModalVisible: false
        })

        this.onNextButton = this.onNextButton.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    async componentDidMount() {
        this.setState({loading: true});
        let response = await vendor_get_mother_category()
        this.setState({loading: false});
        
        if (response.result == true){

            let temp = []

            for (let i = 0; i < response.message.length; i++){

                let item = {key: response.message[i].id, label: response.message[i].name}
                temp.push(item)

            }

            this.setState({categoryArray: temp});
            
        }else{

            this.props.navigation.goBack();

        }

        AppManager.getInstance.shopInfoScreenKey = this.props.navigation.state.key;

    }

    // categoryPicked(pickedValue, pickedIndex){

    //     this.setState({category: String(pickedValue)})
    //     this.setState({categoryId: this.state.categoryArray[pickedIndex].id});

    // }

    // showAreaPicker() {
    //     Picker.init({
    //         pickerData: this.state.categoryData,
    //         pickerTitleText: "Please Select Category",
    //         pickerConfirmBtnText: "Confirm",
    //         pickerCancelBtnText: "Cancel",
    //         pickerRowHeight: 32,
    //         onPickerConfirm: (pickedValue, pickedIndex) => {
    //             this.categoryPicked(pickedValue, pickedIndex);
    //         },
    //         onPickerCancel: (pickedValue, pickedIndex) => {
    //             console.log('category', pickedValue);
    //         },
    //         onPickerSelect: (pickedValue, pickedIndex) => {
    //             console.log('category', pickedValue);
    //         }
    //     });
    //     Picker.show();
    // }

    onNextButton() {

        if (this.state.name == '' || this.state.address == '' || this.state.category == ''){
            Alert.alert(
                'Oops!',
                'Please enter all fields.',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )
            return;
        }

        let formData = new FormData();
        formData.append('shopName', this.state.name);
        formData.append('shopAdd', this.state.address);
        formData.append('shopCat', this.state.categoryId);
        formData.append('lat', this.state.lat);
        formData.append('lng', this.state.lng);

        AppManager.getInstance.addShopFormData = formData;

        this.props.navigation.navigate("ShopInfoScreen")
    }

    showModal(){

        this.input_address.blur()
        this.setState({isModalVisible: true});

    }

    componentWillUnmount() {
        EventRegister.emit('refreshShopList', 'it works!!!')
    }

    render() {
        return (
            <View style = {{flexDirection: 'column', flex: 1}}>

                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center', marginBottom: 10, marginTop: 10}}>
                    <View style={Styles.TextInputContainer}>
                        <Image resizeMode='stretch'  source={require('../../Assets/Images/addnewshop_name_icon.png')} style={Styles.iconStyle} />
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Shop Name"
                            onChangeText={(text) => this.setState({name: text})}
                            value={this.state.name}
                        />
                    </View>
                    <View style={Styles.TextInputContainer}>
                        <Image resizeMode='stretch'  source={require('../../Assets/Images/addnewshop_location_icon.png')} style={Styles.iconStyle} />
                        <TextInput
                            ref={ref => {
                                if (ref != null){
                                    this.input_address = ref;
                                }
                            }}
                            style={Styles.TextInputStyle}
                            placeholder="Shop Address"
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address}
                            blurOnSubmit={false} 
                            onFocus={this.showModal.bind(this)}
                        />
                    </View>

                    <View style={Styles.TextInputContainer}>
                        <Image resizeMode='stretch'  source={require('../../Assets/Images/addnewshop_category_icon.png')} style={Styles.iconStyle} />

                        <View style={[Styles.TextInputStyle, {justifyContent: 'center'}]}>
                            <ModalSelector
                                data={this.state.categoryArray}
                                initValue="Select Category"
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
                                onChange={(option)=>{ 
                                    this.setState({category: option.label})
                                    this.setState({categoryId: option.key})
                                }}>

                                <TextInput
                                    style={{width: '100%', height: 45}}
                                    placeholder="Shop Category"
                                    value={this.state.category}
                                />

                            </ModalSelector>
                        </View>
                    </View>

                    <TouchableOpacity style={{width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 20}}
                        onPress={this.onNextButton}>
                        <Text style={Styles.signInStyle}>Next</Text>
                    </TouchableOpacity>

                </View>

                {/* AddressCompleteModal */}

                <AddressCompleteModal visible={this.state.isModalVisible} onDone={(address, lat, lng)=>{
                                            this.setState({address: address, isModalVisible: false, lat: lat, lng: lng})
                                        }}
                                        onCancel={()=>{
                                            this.setState({isModalVisible: false})
                                        }}
                                      />

            </View>
        );
    }
}