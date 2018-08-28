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

import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { vendor_getShopList, vendor_login, vendor_signup } from "../../Components/Api";
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;

export default class AddressCompleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            email: "combatantek@gmail.com",
            password: "lol",
            loading: false,
            isSignin: 0
        })
    }

    async componentDidMount() {

    }

    render() {
        return (

            <Modal isVisible={this.props.visible} backdropOpacity={1} backdropColor='white'
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={500}
                    animationOutTiming={500}
                    style={{alignItems: 'center'}}>

                    <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: 'red'}}>

                        <View style={{width: '100%', height: 60, backgroundColor: 'blue', justifyContent: 'center', flexDirection: 'row'}}>

                            <Text style={{color: 'black', fontSize: 20, alignSelf: 'center'}}>Select Address</Text>
                            <TouchableOpacity style={{alignSelf: 'flex-end', width: 100, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41', marginTop: 20}}
                                onPress={this.onNextButton}>
                                <Text style={Styles.signInStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>

                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            minLength={2} // minimum length of text to search
                            autoFocus={true}
                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                console.log('xxxxxx', details);
                                this.setState({address: data.description, isModalVisible: false, lat: details.geometry.location.lat, lng: details.geometry.location.lng})
                            }}
                            
                            getDefaultValue={() => ''}
                            
                            query={{
                                // available options: https://developers.google.com/places/web-service/autocomplete
                                key: 'AIzaSyB-WZvdEeV06G_8ssdAF6Q2e_hOY-cQqlA',
                                language: 'en', // language of the results
                                types: 'address' // default: 'geocode'
                            }}
                            
                            styles={{
                                textInputContainer: {
                                    width: '100%'
                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: 'white'
                                }
                            }}
                            
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            // GoogleReverseGeocodingQuery={{
                            //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            // }}
                            // GooglePlacesSearchQuery={{
                            //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            //     rankby: 'distance',
                            //     types: 'food'
                            // }}

                            // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                            />

                    </SafeAreaView>

                </Modal>

        );
    }
}