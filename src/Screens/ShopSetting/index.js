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

const deviceWidth = Dimensions.get("window").width;

export default class ShopSetting extends Component {
    constructor(props) {
        super(props);
        this.state = ({
          
        })

        this.onScheduleButton = this.onScheduleButton.bind(this)
        this.onInformationButton = this.onInformationButton.bind(this)
        this.onPermissionButton = this.onPermissionButton.bind(this)
    }

    async componentDidMount() {

    }

    onScheduleButton(){
        this.props.navigation.navigate("ShopScheduleUpdateScreen");
    }

    onInformationButton(){
        this.props.navigation.navigate("VendorSettingScreen");
    }

    onPermissionButton(){
        alert('permission')
    }

    render() {
        return (
            
            <SafeAreaView style={Styles.safeArea}>
                <TouchableOpacity style={[Styles.signInContainer, { marginTop: 50, backgroundColor: '#FECB6E' }]} onPress={this.onScheduleButton}>
                   
                    <Text style={Styles.titleStyle}>Manage Schedules</Text>
                    
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.signInContainer, { marginTop: 30, backgroundColor: '#6ACA6B' }]} onPress={this.onInformationButton}>
                   
                   <Text style={Styles.titleStyle}>Manage Information</Text>
                   
               </TouchableOpacity>

               <TouchableOpacity style={[Styles.signInContainer, { marginTop: 30, backgroundColor: '#FD676A' }]} onPress={this.onPermissionButton}>
                   
                   <Text style={Styles.titleStyle}>Manage Permisions</Text>
                   
               </TouchableOpacity>

            </SafeAreaView>
            
        );
    }
}