import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Picker from 'react-native-picker';
import Spinner from 'react-native-loading-spinner-overlay';

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
    Dimensions, 
    TextInput
} from 'react-native';

import { vendor_addshop } from "../../Components/Api";
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class AddShop extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: "",
            address: "",
            category: "",
            loading: false
        })

        this.onNextButton = this.onNextButton.bind(this);
        this.showAreaPicker = this.showAreaPicker.bind(this);
    }

    async componentDidMount() {

    }

    showAreaPicker() {
        Picker.init({
            pickerData: ['Category 1', 'Category 2', 'Category 3'],
            pickerTitleText: "Please Select Category",
            pickerConfirmBtnText: "Confirm",
            pickerCancelBtnText: "Cancel",
            onPickerConfirm: pickedValue => {
                console.log('category', pickedValue);
                this.setState({category: String(pickedValue)})
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

    onNextButton() {

        // let formData = new FormData();
        // formData.append('shopName', this.state.name);
        // formData.append('shopAdd', this.state.address);
        // formData.append('shopCat', "3");



        this.props.navigation.navigate("ShopInfoScreen")
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
                            style={Styles.TextInputStyle}
                            placeholder="Shop Address"
                            onChangeText={(text) => this.setState({address: text})}
                            value={this.state.address}
                            
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
            </View>
        );
    }
}