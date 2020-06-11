import React, {Component} from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'

/*
    后台管理的路由组件
*/
export default class Admin extends Component {
    
    render () {
        const user = memoryUtils.user
        
        // 如果内存没有存储user, 当前没有登陆, 不能在当前页面停留
        //      自动跳转到登陆界面
        if(!user || !user._id) { // user根本没有值,或者有值没有id
            return <Redirect to='/login' />
            // 在render中的跳转方式
            // 不同于在事件函数中的跳转方式
            // 一刷新内存就没有user, 但是功能不好, 一刷新就掉线了
            // 无法维持登陆!!!
            // 关掉浏览器, 关掉电脑, 自动登陆
        }

        return (
            <div>
                Hello {user.username}
            </div>
        )
    }
}