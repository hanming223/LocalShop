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
    TouchableOpacity
} from 'react-native';

import { vendor_getShopList, vendor_login } from "../../Components/Api";

import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email: "combatantek@gmail.com",
            password: "lol",
            animating: true,
            isSignin: 0
        })
        this.onSigninMode = this.onSigninMode.bind(this);
        this.onSignupMode = this.onSignupMode.bind(this);
        this.onSigninButton = this.onSigninButton.bind(this);
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

    onSigninMode(){
        this.setState({isSignin: 0})
    }

    onSignupMode(){
        this.setState({isSignin: 1})
    }

    async onSigninButton() {

        this.props.navigation.navigate("PrimaryNav")

        // let formData = new FormData();
        // formData.append('usr', this.state.email);
        // formData.append('psw', this.state.password);

        // let json = await vendor_login(formData)
        
        // if (json.result == true){
        //     AsyncStorage.setItem("is_loggedin", JSON.stringify(true))
        //     this.props.navigation.navigate("PrimaryNav")
            
        // }

    }

    render() {
        return (
            <ImageBackground style={Styles.backgroundImage} source={require('../../Assets/Images/login_top_bg.png')}>
            <SafeAreaView style={Styles.safeArea}>
                <View style={{width: deviceWidth/2, height: deviceWidth/2, marginTop: 0}}>

                    <Image source={require('../../Assets/Images/login_bottom_bg.png')}
                                        style={{width: '100%', height: '100%', resizeMode: 'contain'}} />

                </View>

                <View style={{width: '80%', height: 40, marginTop: 20, flexDirection: 'row'}}>
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
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                    </View>
                    <View style={Styles.TextInputContainer}>
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Password"
                            onChangeText={(text) => this.setState({password: text})}
                            value={this.state.password}
                            
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