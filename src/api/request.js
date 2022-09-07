import axios from "axios";

const requset = axios.create({
    baseURL:'http://127.0.0.1',
    timeout:3000//响应超时时间
})

// 添加请求拦截器
requset.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token')
    config.headers.Authorization = token
    return config;
}, (error)=> {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requset.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //数据请求失败
        //身份认证失败
        // if(response.data.message === '身份认证失败'){
        //     alert('登录过期，请重新登录')
        // }
    return response;
}, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // window.open('','_self').close()
    return Promise.reject(error);
});

export default requset