import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import { EventRegister } from 'react-native-event-listeners'
import ModalSelector from 'react-native-modal-selector'

import {
    Alert,
    StyleSheet,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
    Text,
    View,
    Dimensions, 
    TextInput,
    Keyboard
} from 'react-native';

import { vendor_get_rank_list, vendor_add_shop_permission } from "../../Components/Api";
import Styles from './styles';
import AppManager from '../../Components/AppManager';
import AddressCompleteModal from '../../Screens/AddressCompleteModal';

export default class VendorInvite extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email: "",
            rankArray: [],
            selectedRank: {key: '',label: ''},
            email: '',
            loading: false
        })

        this.onAddButton = this.onAddButton.bind(this);
    }

    async componentDidMount() {

        this.setState({loading: true});
        let response = await vendor_get_rank_list()
        this.setState({loading: false});
        
        if (response.result == true){

            let temp = []

            for (let i = 0; i < response.message.length; i++){

                let item = {key: response.message[i].id, label: response.message[i].name}
                temp.push(item)

            }

            this.setState({rankArray: temp});
            
        }else{

            this.props.navigation.goBack();

        }

    }

    async onAddButton() {

        if (this.state.selectedRank.label == '' || this.state.email == ''){
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

        this.setState({loading: true})

        let formData = new FormData();
        formData.append('vendorEmail', this.state.email)
        formData.append('rank', this.state.selectedRank.key)
        formData.append('manageShop', AppManager.getInstance.selectedShopInfo.id)

        let response = await vendor_add_shop_permission(formData)

        if (response.result == true){
            Alert.alert(
                'Success!',
                this.state.email + ' invited.',
                [
                    {text: 'OK', onPress: () =>{
                       this.setState({loading: false})
                       this.props.navigation.goBack()
                    }},
                ],
                { cancelable: false }
              )       
            
        }else{

            if ((response.error.class == 6) && (response.error.code == 4)){

                Alert.alert(
                    'Oops!',
                    'Vendor linked to this email not found',
                    [
                      {text: 'OK', onPress: () => this.setState({loading: false})},
                    ],
                    { cancelable: false }
                )

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

    }

    componentWillUnmount() {
        EventRegister.emit('getShopPermission', 'it works!!!')
    }

    render() {
        return (
            <View style = {{flexDirection: 'column', flex: 1}}>

                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>

                <View style={{marginLeft: 15, marginRight: 15, alignItems: 'center', marginBottom: 10, marginTop: 10}}>
                    <View style={Styles.TextInputContainer}>
                        <Image resizeMode='stretch'  source={require('../../Assets/Images/addnewshop_name_icon.png')} style={Styles.iconStyle} />
                        <TextInput
                            style={Styles.TextInputStyle}
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({email: text})}
                            value={this.state.email}
                        />
                    </View>
                    
                    <View style={Styles.TextInputContainer}>
                        <Image resizeMode='stretch'  source={require('../../Assets/Images/addnewshop_category_icon.png')} style={Styles.iconStyle} />

                        <View style={[Styles.TextInputStyle, {justifyContent: 'center'}]}>
                            <ModalSelector
                                data={this.state.rankArray}
                                initValue="Select Role"
                                accessible={true}
                                scrollViewAccessibilityLabel={'Scrollable options'}
                                cancelButtonAccessibilityLabel={'Cancel Button'}
                                overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
                                onChange={(option)=>{ 
                                    this.setState({selectedRank: option})
                                }}>

                                <TextInput
                                    style={{width: '100%', height: 45}}
                                    placeholder="Permission"
                                    value={this.state.selectedRank.label}
                                />

                            </ModalSelector>
                        </View>
                    </View>

                    <TouchableOpacity style={{width: '100%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 20}}
                        onPress={this.onAddButton}>
                        <Text style={Styles.signInStyle}>Add</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}