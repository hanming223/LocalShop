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

import { vendor_get_mother_category, vendor_get_similar_products } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Spinner from 'react-native-loading-spinner-overlay';
import Picker from 'react-native-picker';
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;

export default class ChatInbox extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loading: false,
            
        })

      
        
    }

    async componentDidMount() {

        
    }

    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                
                <Text> Chat </Text>

            </SafeAreaView>
        );
    }
}