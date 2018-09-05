import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Picker from 'react-native-picker';
import Spinner from 'react-native-loading-spinner-overlay';


import { EventRegister } from 'react-native-event-listeners'


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

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: "",
            address: "",
            categoryId: "",
            categoryData: [],
            categoryArray: [],
            loading: false,
            isModalVisible: false
        })

        this.onNextButton = this.onNextButton.bind(this);
        this.showAreaPicker = this.showAreaPicker.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    async componentDidMount() {
        this.setState({loading: true});
        let response = await vendor_get_mother_category()
        this.setState({loading: false});
        
        let temp1 = []
        let temp2 = []
        if (response.result == true){

            for (let i = 0; i < response.message.length; i++){

                temp1.push(response.message[i].name);
                temp2.push(response.message[i]);

            }

            this.setState({categoryData: temp1, categoryArray: temp2});
            
        }else{

            this.props.navigation.goBack();

        }

        AppManager.getInstance.shopInfoScreenKey = this.props.navigation.state.key;

    }

    categoryPicked(pickedValue, pickedIndex){

        this.setState({category: String(pickedValue)})
        this.setState({categoryId: this.state.categoryArray[pickedIndex].id});

    }

    showAreaPicker() {
        Picker.init({
            pickerData: this.state.categoryData,
            pickerTitleText: "Please Select Category",
            pickerConfirmBtnText: "Confirm",
            pickerCancelBtnText: "Cancel",
            pickerRowHeight: 32,
            onPickerConfirm: (pickedValue, pickedIndex) => {
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
            <View style = {{alignItems: 'center', flexDirection: 'column', flex: 1}}>
            
                {/* <MapView
                    initialRegion={{latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922,longitudeDelta: 0.0421}}
                    style={{flex: 1, width: '100%', height: 400}}
                    /> */}

                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <View style={{width: '90%', alignItems: 'center', paddingBottom: 10, paddingTop: 10}}>
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
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Shop Category"
                            value={this.state.category}
                            onFocus={this.showAreaPicker.bind(this)}
                        />
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