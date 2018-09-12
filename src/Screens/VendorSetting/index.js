import React, { Component } from 'react';
import {
    View,
    TextInput,
    Platform,
    StyleSheet,
    Image,
    Button,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    Text,
    AsyncStorage,
    SafeAreaView,
    TouchableOpacity,
    Alert
} from 'react-native';

import { vendor_get_info, vendor_update_info } from "../../Components/Api";
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';
import PhoneInput from 'react-native-phone-input'

const deviceWidth = Dimensions.get("window").width;

export default class VendorSetting extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            loading: false,
        })

        this.onLogoutButton = this.onLogoutButton.bind(this);
        this.onUpdateButton = this.onUpdateButton.bind(this);
       
    }

    async componentDidMount() {

        this.setState({loading: true})

        let response = await vendor_get_info()
        
        this.setState({loading: false})

        if (response.result == true){

            this.setState({emailAddress: response.message.email})
            this.setState({firstName: response.message.name})
            this.setState({lastName: response.message.surname})
            this.setState({phoneNumber: response.message.phone})

        }

    }

    async onLogoutButton(){
        
        await AsyncStorage.setItem("is_loggedin", JSON.stringify(false))
        this.props.navigation.navigate("Start")
    }

    async onUpdateButton(){
        
        if (this.state.password != this.state.confirmPassword){

            Alert.alert(
                'Oops!',
                "Password doesn't match.",
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )

            return

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
        }


        // this.setState({loading: true})

        let formData = new FormData()

        if (this.state.emailAddress == '' || this.validateEmail(this.state.emailAddress)){
            formData.append('email', this.state.emailAddress)
        }

        if (this.state.firstName != ''){
            formData.append('name', this.state.firstName)
        }

        if (this.state.lastName != ''){
            formData.append('surname', this.state.lastName)
        }

        if (this.phoneRef.getValue() != ''){
            formData.append('phone', this.phoneRef.getValue())
        }
        
        if (this.state.password != ''){
            formData.append('psw', this.state.password)
            formData.append('confirmPsw', this.state.confirmPassword)
        }

        let response = await vendor_update_info(formData)
        
        if (response.result == true){

            this.setState({loading: false})
            this.props.navigation.goBack()

        }else{

            Alert.alert(
                'Oops!',
                'Something went wrong.',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )

        }

    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        return (
            <ScrollView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <View style={{marginTop: 20, marginLeft: 15, marginRight: 15}}>
                    <Text style={{fontSize: 16, color: 'black'}}>Your name</Text> 
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            onChangeText={(text) => this.setState({firstName: text})}
                            autoCapitalize='none'
                            value={this.state.firstName}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Text style={{fontSize: 16, color: 'black'}}>Your surname</Text> 
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            onChangeText={(text) => this.setState({lastName: text})}
                            autoCapitalize='none'
                            value={this.state.lastName}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Text style={{fontSize: 16, color: 'black'}}>Your email address</Text> 
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({emailAddress: text})}
                            autoCapitalize='none'
                            value={this.state.emailAddress}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Text style={{fontSize: 16, color: 'black'}}>Your phone number</Text> 
                    <View style={Styles.TextInputContainer}>

                        <PhoneInput style={Styles.TextInputStyle}
                                    value={this.state.phoneNumber}
                                    ref={ref => {
                                        if (ref != null){
                                            this.phoneRef = ref;
                                        }
                                    }}
                        />

                        {/* <TextInput
                            style={Styles.TextInputStyle}
                            keyboardType="phone-pad"
                            onChangeText={(text) => this.setState({phoneNumber: text})}
                            autoCapitalize='none'
                            value={this.state.phoneNumber}
                        /> */}

                    </View>

                    <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>CHANGE PASSWORD</Text> 

                    <Text style={{fontSize: 16, color: 'black'}}>New password</Text> 
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            onChangeText={(text) => this.setState({password: text})}
                            autoCapitalize='none'
                            value={this.state.email}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Text style={{fontSize: 16, color: 'black'}}>Repeat new password</Text> 
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            onChangeText={(text) => this.setState({confirmPassword: text})}
                            autoCapitalize='none'
                            value={this.state.email}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    

                    <TouchableOpacity style={[Styles.signInContainer, { backgroundColor: "#6ACA6B", marginTop: 20 }]} onPress={this.onUpdateButton}>
                        <Text style={Styles.signInStyle_selected}>Update Information</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Styles.signInContainer, { backgroundColor: "#FD676A", marginBottom: 20 }]} onPress={this.onLogoutButton}>
                        <Text style={Styles.signInStyle_selected}>Log out</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
       
        );
    }
}