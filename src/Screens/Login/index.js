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
        })
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
                <View style={{width: deviceWidth/2, height: deviceWidth/2, marginTop: 0, backgroundColor: '#fff'}}>

                    <Text>  LOGO </Text>

                </View>

                <View style={{width: '80%', height: 40, marginTop: 20, flexDirection: 'row'}}>
                    <TouchableOpacity style={Styles.TouchableOpacityStyle}
                        onPress={this.onSigninButton}>
                        <Text style={Styles.signInStyle}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.TouchableOpacityStyle}
                        onPress={this.onSigninButton}>
                        <Text style={Styles.signInStyle}>Sign Up</Text>
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

                    <TouchableOpacity style={{width: '100%', height: 45, alignItems: 'center', justifyContent: 'center'}}
                        onPress={this.onSigninButton}>
                        <Text style={Styles.signInStyle}>Sign In</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
            </ImageBackground>
        );
    }
}