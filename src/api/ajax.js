// 封装axios定义ajax请求函数模块
// 根据接口文档定义接口请求函数模块

/*
        能发送异步ajax请求的函数模块
        封装axios
        函数的返回值是promise对象


优化:
        1.统一处理请求异常
        2.在外层包一个自己创建的promise对象, 在请求出错时, 不去reject(error), 而是显示错误提示

*/

import axios from 'axios'
import {message} from 'antd'

// data指定默认值:  空对象
export default function ajax(url, data={}, type='GET') {

    // 同步执行的回调函数, 执行器
    return new Promise((resolve, reject) => {
        let promise

        // 1.执行异步ajax请求
        if(type === 'GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data  // 指定请求参数, 不需要自己拼串
            })
        } else { // 发POST请求
            promise = axios.post(url, data)
        }

        // 2.如果成功了, 调用resolve(value)
        promise.then(response => {
            resolve(response)
            // 3.如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('请求出错: ' + error.message)
        })

       
    })
}

// 请求登陆接口
//     ajax('/login', {usernmae: 'Tom', password: '12345'}, 'POST').then

// 添加用户
