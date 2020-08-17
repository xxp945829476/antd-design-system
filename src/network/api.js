import fetch from "./request"
import Qs from "qs";


export function getShopList(params){
    return fetch({
        url:'',
        method:'post',
        params:params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
}