/* 应用的根组件 */

import React from "react";          /* 定义react组件就必须应用 */
import {Component} from "react";    /* 属性 */
import { message, Button } from 'antd';      /* antd定义了很多组件, 用一个对象把这些组件包起来, 这里只用到其中一个 */

/*
        引入antd

        1.自定义主题
        2.按需打包
*/

// 缺少样式:    没有样式就要引入样式

// 最简单方法:   引入所有样式

export default class App extends Component {

    // message是一个对象组件
    handleClick = () => {
        message.success('succeess......');
    }

    // 类组件必须有一个render, 返回一个虚拟dom对象
    //    使用jsx的标签语法返回这个虚拟dom对象, 最终生成一个真实的div标签对象
    render () {
        // return <div>App</div>
        // 所有React组件的名字第一个字母是大写的!!!
        // 给Button加一个组件监听
        return <Button type="primary" onClick={this.handleClick}>测试Antd</Button>
    }
}