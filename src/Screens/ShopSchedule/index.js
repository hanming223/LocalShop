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
    Alert,
    ScrollView
} from 'react-native';

import CheckBox from 'react-native-check-box'
import DatePicker from 'react-native-datepicker'
import DayScheduleModel from '../../Components/DayScheduleModel'
import Spinner from 'react-native-loading-spinner-overlay';
import { EventRegister } from 'react-native-event-listeners'

import { vendor_addshop, vendor_sendshop } from "../../Components/Api";
import AppManager from '../../Components/AppManager';
import Styles from './styles';

const deviceWidth = Dimensions.get("window").width;
const dayArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default class ShopSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
            loading: false
        })

        this.onClick = this.onClick.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
        this.onDoneButton = this.onDoneButton.bind(this);
        
    }

    async componentDidMount() {
        
        let temp = this.state.data
        for(let i = 0; i < 7; i++){
            let day = new DayScheduleModel()
            day.morningStartTime = '07:00'
            day.morningEndTime = '13:00'
            day.afternoonStartTime = '13:00'
            day.afternoonEndTime = '22:00'
            temp.push(day)
        }
        this.setState({data: temp})

    }

    onClick(p, index) {
        // if p = 0, morning, 1,  afternoon

        let temp = this.state.data;

        if (p == 0){
            temp[index].isMorningOn = !temp[index].isMorningOn
        }else{
            temp[index].isAfternoonOn = !temp[index].isAfternoonOn
        }

        this.setState({data: temp});

    }

    dateChanged(p, s, date, index){
        // if p = 0, morning, 1,  afternoon
        // if s = 0, start time, 1,  end time


        //convert to 24 hour format
        // let PM = date.match('pm') ? true : false
        // let time = date.split(':')
        // let hour, min;
        // if (PM) {
        //     hour = 12 + parseInt(time[0],10);
        //     min = time[1].replace(' pm', '');
        // }else{
        //     hour = time[0];
        //     min = time[1].replace(' am', '');
        // }
        // let timeString = hour + ':' + min


        let temp = this.state.data;

        if (p ==0){
            if (s == 0){
                temp[index].morningStartTime = date
            }else{
                temp[index].morningEndTime = date
            }
        }else{
            if (s == 0){
                temp[index].afternoonStartTime = date
            }else{
                temp[index].afternoonEndTime = date
            }
        }

        this.setState({data: temp});

    }

    async onDoneButton() {

        let temp = this.state.data;

        let params = []
        for (let i = 0; i < temp.length; i++){

            let day = {}

            day['day'] = i + 1
            if (temp[i].isMorningOn == true){
                day['morning'] = {'start': temp[i].morningStartTime, 'end': temp[i].morningEndTime}
            }else{
                day['morning'] = null
            }

            if (temp[i].isAfternoonOn == true){
                day['afternoon'] = {'start': temp[i].afternoonStartTime, 'end': temp[i].afternoonEndTime}
            }else{
                day['afternoon'] = null
            }
            
            params.push(day);

        }

        AppManager.getInstance.shopInfoFormData.append('schedules', params);

        this.setState({loading: true});

        //add shop

        let json = await vendor_addshop(AppManager.getInstance.addShopFormData);

        let shopId;
        if (json.result == true){
            shopId = json.message;
            this.addShopInformation(shopId);
        }else{
            Alert.alert(
                'Oops!',
                'Something went wrong!',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
              )
        }

    }

    async addShopInformation(shopId){

        //add shop information

        AppManager.getInstance.shopInfoFormData.append('manageShop', shopId);

        console.log('shopInfoFormData', AppManager.getInstance.shopInfoFormData);

        let response = await vendor_sendshop(AppManager.getInstance.shopInfoFormData);
        console.log('xxx', response);

        if (response.result == true){
            Alert.alert(
                'Success!',
                'Shop added successfully.',
                [
                  {text: 'OK', onPress: () => {
                        this.setState({loading: false});
                        this.props.navigation.goBack(AppManager.getInstance.shopInfoScreenKey);
                    }},
                ],
                { cancelable: false }
              )
        }else{
            Alert.alert(
                'Oops!',
                'Something went wrong',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ],
                { cancelable: false }
            )
        }

    }

    componentWillUnmount() {
        EventRegister.emit('refreshShopList', 'it works!!!')
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, alignItems: 'center', width: '100%'}}>
                <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>
                <ScrollView contentContainerStyle = {{alignItems: 'center'}} style={{width: '100%' }}>
                {this.state.data.map((prop, key) => {
                    
                    return (
                    
                        <View style={Styles.dayComponent}>
                            <Text style={Styles.dayTitle}>{dayArray[key]}</Text>
                            <View style={Styles.halfComponentt}>
                                <CheckBox
                                    style={{width: 120, padding: 10}}
                                    isChecked={prop.isMorningOn}
                                    rightText='Morning'
                                    onClick={()=>this.onClick(0, key)}
                                />

                                <DatePicker
                                    style={{width: 80}}
                                    mode="time"
                                    format="HH:mm"
                                    date={prop.morningStartTime}
                                    minDate="07:00"
                                    maxDate="13:00"
                                    placeholder="Start Time"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    is24Hour={true}
                                    customStyles={{
                                        dateInput: {
                                            height: 30,
                                        }
                                    }}
                                    disabled={!prop.isMorningOn}
                                    hideText={!prop.isMorningOn}
                                    onDateChange={(date) => {this.dateChanged(0, 0, date, key)}}
                                />

                                <DatePicker
                                    style={{width: 80, marginLeft: 20}}
                                    mode="time"
                                    format="HH:mm"
                                    date={prop.morningEndTime}
                                    minDate="07:00"
                                    maxDate="13:00"
                                    placeholder="End Time"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    showIcon={false}
                                    is24Hour={true}
                                    customStyles={{
                                        dateInput: {
                                            height: 30,
                                        }
                                    }}
                                    disabled={!prop.isMorningOn}
                                    hideText={!prop.isMorningOn}
                                    onDateChange={(date) => {this.dateChanged(0, 1, date, key)}}
                                />

                            </View>

                            <View style={Styles.halfComponentt}>
                                <CheckBox
                                    style={{width: 120, padding: 10}}
                                    isChecked={prop.isAfternoonOn}
                                    rightText='Afternoon'
                                    onClick={()=>this.onClick(1, key)}
                                />

                                <DatePicker
                                    style={{width: 80}}
                                    mode="time"
                                    format="HH:mm"
                                    placeholder="Start Time"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    date={prop.afternoonStartTime}
                                    minDate="13:00"
                                    maxDate="22:00"
                                    showIcon={false}
                                    is24Hour={false}
                                    customStyles={{
                                        dateInput: {
                                            height: 30,
                                        }
                                    }}
                                    disabled={!prop.isAfternoonOn}
                                    hideText={!prop.isAfternoonOn}
                                    onDateChange={(date) => {this.dateChanged(1, 0, date, key)}}
                                />

                                <DatePicker
                                    style={{width: 80, marginLeft: 20}}
                                    mode="time"
                                    format="HH:mm"
                                    placeholder="End Time"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    date={prop.afternoonEndTime}
                                    minDate="13:00"
                                    maxDate="22:00"
                                    showIcon={false}
                                    is24Hour={false}
                                    customStyles={{
                                        dateInput: {
                                            height: 30,
                                        }
                                    }}
                                    disabled={!prop.isAfternoonOn}
                                    hideText={!prop.isAfternoonOn}
                                    onDateChange={(date) => {this.dateChanged(1, 1, date, key)}}
                                />

                            </View>
                            

                        </View>

                    );

                })}

                <TouchableOpacity style={Styles.signInContainer}
                    onPress={this.onDoneButton}>
                        
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                    
                </TouchableOpacity>
                
                </ScrollView>

            </SafeAreaView>
        );
    }
}