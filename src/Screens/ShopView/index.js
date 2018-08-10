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

import ImagePicker from 'react-native-image-picker';

import { vendor_getShopList, vendor_login, vendor_signup } from "../../Components/Api";
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Styles from './styles';
import AppManager from '../../Components/AppManager';

const deviceWidth = Dimensions.get("window").width;

export default class ShopView extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            image: null,
            story: ''
        })

        this.onImageButton = this.onImageButton.bind(this);
        this.onSaveButton = this.onSaveButton.bind(this);

    }

    async componentDidMount() {

        let imageLocation = "http://ls.antonioantek.com/images/" + AppManager.getInstance.selectedShopInfo.preview + ".jpg";
        this.setState({image: { uri: imageLocation }});

    }

    onImageButton(){
        
        var options = {
            title: 'Select Thumbnail',
            allowsEditing: false,
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                
                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                this.setState({image: source});
            }
        });

    }

    onSaveButton() {



    }

    render() {

        return (

            <SafeAreaView style={Styles.safeArea}>
                <KeyboardAwareScrollView style={{flex: 1, width: '100%', height: '100%'}}>
                    <View style={{flex: 1, width: '100%', height: '100%', alignItems: 'center'}}>
                        <TouchableOpacity style={{width: '40%', resizeMode: 'contain', aspectRatio: 1,
                                            borderRadius: deviceWidth * 0.2, marginTop: 20}}
                                onPress={this.onImageButton}>

                            <Image source={this.state.image}
                                                style={{width: '100%', height: '100%', resizeMode: 'cover', 
                                                    borderWidth: 1, borderColor: 'gray', borderRadius: deviceWidth * 0.2}} />
                        
                        </TouchableOpacity>

                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', marginTop: 20}}>Shop Story</Text> 

                        <View style={Styles.TextInputContainer}>
                            <TextInput
                                style={Styles.TextInputStyle}
                                placeholder="Shop Story"
                                onChangeText={(text) => this.setState({story: text})}
                                autoCapitalize='none'
                                multiline={true}
                            />
                        </View>

                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity style={{width: '90%', height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EC6A41',
                        }}
                        onPress={this.onSaveButton}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Save</Text>
                    </TouchableOpacity>

            </SafeAreaView>
 
        );
    }
}