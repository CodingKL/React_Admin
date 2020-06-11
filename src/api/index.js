/*
       包含应用中所有接口请求函数的模块
       设计为一个对象
       统一暴露
       分别暴露
       每个函数的返回值都是promise

要求:
        能根据接口文档定义接口请求
*/

import ajax from './ajax'

// const BASE = 'http://localhost:5000'   // 5000端口下有路由处理
const BASE = ''

// 登陆
/*
export function reqLogin(username, password) {
    return ajax('/login', {username, password}, 'POST')
}*/
// export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

/*
        三种情况下会出现跨域:
            1.端口号不一致     ------>  ajax请求跨域了  -----> jsonp只能处理get请求跨域   ------>  cors后台允许跨域(开发不常用)   ------> 开发中常用代理  ----> 启动代理服务器转发请求
            2.协议名不一致
            3.主机名不一致
*/

// 在3000下请求5000, 出现跨域错误, Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the reque
export const reqLogin = (username, password) => ajax(BASE + '/login2', {username, password}, 'POST')   

// 添加用户, 一定要写{}, 则里面必须加上return!
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')