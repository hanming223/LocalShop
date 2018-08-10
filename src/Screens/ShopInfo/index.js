import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhoneInput from 'react-native-phone-input'


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
    TouchableOpacity
} from 'react-native';

import { vendor_getShopList, vendor_login } from "../../Components/Api";

import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;


export default class ShopInfo extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            companyType: 'company',
            companyName: '',
            plva: '',
            owner: '',
            city: '',
            address: '',
            phone_prefix: '',
            phone: ''
        })

        this.onCompanyOption = this.onCompanyOption.bind(this);
        this.onFreelancerOption = this.onFreelancerOption.bind(this);
        this.onDoneButton = this.onDoneButton.bind(this);
    }

    async componentDidMount() {
       
        // let formData = new FormData();
        // formData.append('usr', 'combatantek@gmail.com');
        // formData.append('psw', 'lol');

        // let json = await vendor_login(formData)
        // alert(json.result);
        // if (json.result == true){
        //     // AsyncStorage.setItem("is_loggedin", JSON.stringify(true))
        //     // this.props.navigation.navigate("PrimaryNav")
        // }

    }

    onCompanyOption() {
        this.setState({companyType: 'company'});
    }

    onFreelancerOption() {
        this.setState({companyType: 'private'});
    }

    onDoneButton() {

        // this.props.navigation.navigate("ShopScheduleScreen")

        if (this.state.companyName == '' || this.state.plva == '' || this.state.owner == '' || this.state.city == '' || this.state.address == ''
            || this.state.phone == ''){
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

        if (this.phoneRef.isValidNumber() == false){
            Alert.alert(
                'Oops!',
                'Invalid phone number.',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )
            return
        }else{
            this.setState({phone: this.phoneRef.getValue()});
            alert(this.phoneRef.getValue());
        }

        let formData = new FormData();
        formData.append('companyType', this.state.companyType);
        formData.append('companyName', this.state.companyName);
        formData.append('plva', this.state.plva);
        formData.append('owner', this.state.owner);
        formData.append('city', this.state.city);
        formData.append('phone', this.state.phone);
        

        AppManager.getInstance.shopInfoFormData = formData;
        

    }

    render() {

        let company_icon, company_text, freelancer_icon, freelancer_text;

        if (this.state.companyType == 'company'){
            company_icon = <Image source={require('../../Assets/Images/shopinfo_option_selected.png')} style={{width: 25, height: 25}} />
            company_text = <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black', marginLeft: 10}}>Company</Text>

            freelancer_icon = <Image source={require('../../Assets/Images/shopinfo_option_deselected.png')} style={{width: 25, height: 25}} />
            freelancer_text = <Text style={{fontSize: 16, fontWeight: 'bold', color: 'gray', marginLeft: 10 }}>Freelancer</Text>
        }else{
            company_icon = <Image source={require('../../Assets/Images/shopinfo_option_deselected.png')} style={{width: 25, height: 25}} />
            company_text = <Text style={{fontSize: 16, fontWeight: 'bold', color: 'gray', marginLeft: 10 }}>Company</Text>

            freelancer_icon = <Image source={require('../../Assets/Images/shopinfo_option_selected.png')} style={{width: 25, height: 25}} />
            freelancer_text = <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Freelancer</Text>
        }

        return (
            <KeyboardAwareScrollView style={{flex: 1, width: '100%', height: '100%',}}>
            <View style={Styles.backgroundImage}>
                    {/* Type selection */}

                    <View style={{width: '100%', height: 25, flexDirection: 'row', marginTop: 20, marginBottom: 10}}>
                        
                        <View style={{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <TouchableOpacity style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                                onPress={this.onCompanyOption}>
                                    {company_icon}
                                    {company_text}
                            </TouchableOpacity> 
                        </View>

                        <View style={{width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <TouchableOpacity style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                                onPress={this.onFreelancerOption}>
                                    {freelancer_icon}
                                    {freelancer_text}
                            </TouchableOpacity> 
                        </View>

                    </View>

                    <View style={{width: '100%', flexDirection: 'column', alignItems: 'center'}}>

                        {/* Company Name,  Tax Code. Administrator/Owner */}
                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Company Name"
                                onChangeText={(text) => this.setState({companyName: text})}
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Tax Code"
                                onChangeText={(text) => this.setState({plva: text})}
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Administrator/Owner"
                                onChangeText={(text) => this.setState({owner: text})}
                            />
                        </View>

                        {/* Registered Office */}

                        <View style={{ marginTop: 10, width: '90%'}}>
                            <Text style={{fontSize: 14, color: 'black'}}>Registered office</Text>
                        </View>

                        {/* City, Address */}

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="City"
                                onChangeText={(text) => this.setState({city: text})}
                            />
                        </View>

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Address"
                                onChangeText={(text) => this.setState({address: text})}
                            />
                        </View>

                        {/* Phone contact */}

                        <View style={{ marginTop: 10, width: '90%'}}>
                            <Text style={{fontSize: 14, color: 'black'}}>Phone contact</Text>
                        </View>

                        {/* Phone contact */}

                        <View style={Styles.TextInputContainer}>

                            {/* <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Phone Number"
                                value={this.state.password}
                            /> */}

                            <PhoneInput style={Styles.TextInputStyle}
                                ref={ref => {
                                    if (ref != null){
                                        this.phoneRef = ref;
                                    }
                                }}
                            />

                        </View>

                        <TouchableOpacity style={{width: '90%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 20}}
                            onPress={this.onDoneButton}>
                            <Text style={Styles.signInStyle}>Next</Text>
                        </TouchableOpacity>

                    </View>
                
            </View>
            </KeyboardAwareScrollView>
        );
    }
}