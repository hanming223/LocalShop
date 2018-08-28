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

export default class NotificationList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
        })

    }


    render() {
        return (
            <Text> Notification </Text>
        );
    }
}