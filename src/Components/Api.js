import React, { Component } from 'react';
import {
    Platform,
    AsyncStorage
} from 'react-native';

const API_ROOT = "http://ls.antonioantek.com/api/vendor/"
const API_VENDOR_SHOP_LIST = API_ROOT + "myShops"
const API_VENDOR_LOGIN = API_ROOT + "login"
const API_VENDOR_SIGNUP = API_ROOT + "signUp"
const API_VENDOR_ADDSHOP = API_ROOT + "addShop"
const API_VENDOR_SENDSHOP = API_ROOT + "sendShop"
const API_VENDOR_UPLOADIMAGE = API_ROOT + "addImage"
const API_VENDOR_UPDATE_SHOPINFO = API_ROOT + "updateShopInfo"
const API_VENDOR_REFRESH_TOKEN = API_ROOT + "refreshToken"
const API_VENDOR_IMAGE_RELATIONSHIP = API_ROOT + "addImageRelationship"
const API_VENDOR_UPDATE_SHOP_PREVIEW = API_ROOT + "updateShopPreview"
const API_VENDOR_GET_MOTHER_CATEGORY = "http://ls.antonioantek.com/api/localShop/getMCategories"
const API_VENDOR_GET_SUB_CATEGORY = "http://ls.antonioantek.com/api/localShop/getSubCategories"
const API_VENDOR_GET_SHOP_CATS = "http://ls.antonioantek.com/api/localShop/getShopCats"
const API_VENDOR_GET_BRANDS = "http://ls.antonioantek.com/api/localShop/getBrands"
const API_VENDOR_GET_SIMILAR_PRODUCTS = API_ROOT + "similarProducts"
const API_VENDOR_GET_PRODUCTS = API_ROOT + "getProducts"
const API_VENDOR_UPLOAD_MULTIPLE_IMAGES = API_ROOT + "addImages"
const API_VENDOR_GET_PRODUCT_VARIANTS = API_ROOT + "getProductVariants"



export async function vendor_getShopList() {
    return await getJSONWithToken(API_VENDOR_SHOP_LIST)
}   

export async function vendor_login(json) {
    return await postJSON(API_VENDOR_LOGIN, json)
}

export async function vendor_signup(json) {
    return await postJSON(API_VENDOR_SIGNUP, json)
}

export async function vendor_addshop(json) {
    return await postJSONWithToken(API_VENDOR_ADDSHOP, json)
}

export async function vendor_sendshop(json) {
    return await postJSONWithToken(API_VENDOR_SENDSHOP, json)
}

export async function vendor_upload_image(json) {
    return await postJSONWithToken(API_VENDOR_UPLOADIMAGE, json)
}

export async function vendor_update_shopinfo(json) {
    return await postJSONWithToken(API_VENDOR_UPDATE_SHOPINFO, json)
}

export async function vendor_add_image_relationship(json) {
    return await postJSONWithToken(API_VENDOR_IMAGE_RELATIONSHIP, json)
}

export async function vendor_get_mother_category() {
    return await postJSON(API_VENDOR_GET_MOTHER_CATEGORY)
}

export async function vendor_get_shop_category(json) {
    return await postJSON(API_VENDOR_GET_SHOP_CATS, json)
}

export async function vendor_update_shop_preview(json) {
    return await postJSONWithToken(API_VENDOR_UPDATE_SHOP_PREVIEW, json)
}

export async function vendor_get_similar_products(json) {
    return await postJSONWithToken(API_VENDOR_GET_SIMILAR_PRODUCTS, json)
}

export async function vendor_get_products(json) {
    return await postJSONWithToken(API_VENDOR_GET_PRODUCTS, json)
}

export async function vendor_get_brands() {
    return await postJSONWithToken(API_VENDOR_GET_BRANDS)
}

export async function vendor_get_sub_catgegory() {
    return await postJSONWithToken(API_VENDOR_GET_SUB_CATEGORY)
}

export async function vendor_upload_multiple_images(json) {
    return await postJSONWithToken(API_VENDOR_UPLOAD_MULTIPLE_IMAGES, json)
}

export async function vendor_get_product_variants(json) {
    return await postJSONWithToken(API_VENDOR_GET_PRODUCT_VARIANTS, json)
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

    if (refreshToken() == false){
        return
    }
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

export async function postJSONWithToken(url, form_data) {

    if (refreshToken() == false){
        return
    }

    const token = await AsyncStorage.getItem('token');

    try {

        let response = await fetch(url, {
            method: 'POST',
            body: form_data,
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });

        return await response.json()

    } catch (error) {
        return error
    }       

}

export async function refreshToken() {

    const refreshToken = await AsyncStorage.getItem('refreshToken');

    let formData = new FormData();
    formData.append('refreshToken', refreshToken);
    
    let response = await postJSON(API_VENDOR_REFRESH_TOKEN, formData);

    if (response.result == true){
        await AsyncStorage.setItem("token", response.message.token)
        await AsyncStorage.setItem("refreshToken", response.message.refreshToken)
        return true;
    }else{
        return false;
    }

}

export async function postJSON(url, form_data) {

    try {

        let response = await fetch(url, {
            method: 'POST',
            body: form_data,
        });

        return await response.json()

    } catch (error) {
        return error
    }       

}