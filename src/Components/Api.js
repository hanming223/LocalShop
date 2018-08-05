import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage
} from 'react-native';

const API_ROOT = "http://ls.antonioantek.com/api/vendor/"
const API_VENDOR_SHOP_LIST = API_ROOT + "myShops"
const API_VENDOR_LOGIN = API_ROOT + "login"
const API_VENDOR_SIGNUP = API_ROOT + "signUp"

export async function vendor_getShopList() {
    return await getJSONWithToken(API_VENDOR_SHOP_LIST)
}   

export async function vendor_login(json) {
    return await postJSON(API_VENDOR_LOGIN, json)
}

export async function vendor_signup(json) {
    return await postJSON(API_VENDOR_SIGNUP, json)
}

export async function getJSON(url){

    try {
        let response = await fetch(url)

        return await response.json()          
        
    } catch (error) {
        return error
    }    
    
}

export async function getJSONWithToken(url){

    const token = await AsyncStorage.getItem('token');

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });

        return await response.json()          
        
    } catch (error) {
        return error
    }    
    
}

export async function postJSON(url, form_data) {

    try {

        let result = await fetch(url, {
            method: 'POST',
            body: form_data,
        });

        return await result.json()

    } catch (error) {
        return error
    }       

}