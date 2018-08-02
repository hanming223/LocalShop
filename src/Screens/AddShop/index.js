import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

import { vendor_getShopList } from "../../Components/Api";
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
        })
        this.onNextButton = this.onNextButton.bind(this);
    }

    async componentDidMount() {

    }

    onNextButton() {
        this.props.navigation.navigate("ShopInfoScreen")
    }

    render() {
        return (
            <View style = {{alignItems: 'center', flexDirection: 'column', flex: 1}}>
            
                <MapView
                    initialRegion={{latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922,longitudeDelta: 0.0421}}
                    style={{flex: 1, width: '100%', height: 400}}
                    />

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
                            onChangeText={(text) => this.setState({category: text})}
                            value={this.state.category}
                            
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