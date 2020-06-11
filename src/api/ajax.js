// 封装axios定义ajax请求函数模块
// 根据接口文档定义接口请求函数模块

/*
        能发送异步ajax请求的函数模块
        封装axios
        函数的返回值是promise对象
*/

import axios from 'axios'

// data指定默认值:  空对象
export default function ajax(url, data={}, type='GET') {
    if(type === 'GET') { // 发GET请求
        return axios.get(url, { // 配置对象
            params: data  // 指定请求参数, 不需要自己拼串
        })
    } else { // 发POST请求
        return axios.post(url, data)
    }
}

// 请求登陆接口
//     ajax('/login', {usernmae: 'Tom', password: '12345'}, 'POST').then

// 添加用户
