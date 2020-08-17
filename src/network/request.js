import Vue from 'vue';
import router from '../router';
import axios from "axios";

const request = axios.create({//创建axios实例，设置请求的默认配置
    // 设置超时时间
    timeout: 30000,
    // 基础url，会在请求url中自动添加前置链接
    // baseURL: process.env.VUE_APP_BASE_API
    baseURL:''
})

// 请求拦截
request.interceptors.request.use(
	//config 代表是你请求的一些信息
    config => {
        // const token = store.getters.token
        // if (token) {
        //     config.headers.Authorization = token // 请求头部添加token
        // }
        // 在请求发送之前的操作
        return config
    },
    error => {
        // 对错误请求的处理
        // 弹出错误请求消息
       
        return Promise.reject(error)
    }
)

//  response拦截器 响应拦截器 请求之后的操作
request.interceptors.response.use(
    config => {
        const code = config.status
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default request;