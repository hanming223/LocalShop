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

import { vendor_getShopList, vendor_login, vendor_signup } from "../../Components/Api";
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';

import MainTaBar from "../../Router.js"

const deviceWidth = Dimensions.get("window").width;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email: "combatantek@gmail.com",
            password: "lol",
            loading: false,
            isSignin: 0
        })

        this.onSigninMode = this.onSigninMode.bind(this);
        this.onSignupMode = this.onSignupMode.bind(this);
        this.onSigninButton = this.onSigninButton.bind(this);
    }

    async componentDidMount() {

    }

    onSigninMode(){
        this.setState({isSignin: 0})
    }

    onSignupMode(){
        this.setState({isSignin: 1})
    }

    async onSigninButton() {
        
        this.setState({loading: true});

        if (this.state.isSignin == 0){

            let formData = new FormData();
            formData.append('usr', this.state.email);
            formData.append('psw', this.state.password);

            let json = await vendor_login(formData)

            if (json.result == true){

                this.setState({loading: false})
                
                await AsyncStorage.setItem("is_loggedin", JSON.stringify(true))
                await AsyncStorage.setItem("token", json.message.token)
                await AsyncStorage.setItem("refreshToken", json.message.refreshToken)
                
                this.props.navigation.navigate("Main")
                
            }else{
                
                Alert.alert(
                    'Oops!',
                    'Invalid email or password.',
                    [
                      {text: 'OK', onPress: () => this.setState({loading: false})},
                    ],
                    { cancelable: false }
                  )

            }

        }else{
            
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('psw', this.state.password);

            let json = await vendor_signup(formData)
     
            if (json.result == true){

                this.setState({loading: false})
                
                await AsyncStorage.setItem("is_loggedin", JSON.stringify(true))
                await AsyncStorage.setItem("token", json.message.token)
                await AsyncStorage.setItem("refreshToken", json.message.refreshToken)
                this.props.navigation.navigate("Main")
                
            }else{
                
                Alert.alert(
                    'Oops!',
                    'Something went wrong!.',
                    [
                      {text: 'OK', onPress: () => this.setState({loading: false})},
                    ],
                    { cancelable: false }
                  )

            }

        }

    }

    render() {
        return (
            <ImageBackground style={Styles.backgroundImage} source={require('../../Assets/Images/login_top_bg.png')}>
            <SafeAreaView style={Styles.safeArea}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>
                <View style={{width: '80%', height: 40, marginTop: 50, flexDirection: 'row'}}>
                    <TouchableOpacity style={Styles.TouchableOpacityStyle}
                        onPress={this.onSigninMode}>
                        {this.state.isSignin == 0 ? (
                            <Text style={Styles.signInStyle_selected}>Sign In</Text>
                        ):(
                            <Text style={Styles.signInStyle_unselected}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.TouchableOpacityStyle}
                        onPress={this.onSignupMode}>
                        {this.state.isSignin == 1 ? (
                            <Text style={Styles.signInStyle_selected}>Sign Up</Text>
                        ):(
                            <Text style={Styles.signInStyle_unselected}>Sign Up</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 20, width: '90%'}}>
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({email: text})}
                            autoCapitalize='none'
                            value={this.state.email}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Password"
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <TouchableOpacity style={Styles.signInContainer}
                        onPress={this.onSigninButton}>
                        
                        {this.state.isSignin == 0 ? (
                            <Text style={Styles.signInStyle_selected}>Sign In</Text>
                        ):(
                            <Text style={Styles.signInStyle_selected}>Sign Up</Text>
                        )}
                        
                    </TouchableOpacity>

                </View>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Image source={require('../../Assets/Images/login_bottom_bg.png')}
                                        style={{width: '80%', height: '100%', resizeMode: 'contain'}} />
                </View>

            </SafeAreaView>
            </ImageBackground>
        );
    }
}