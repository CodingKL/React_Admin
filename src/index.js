/* 入口js文件 */

/* 一个项目至少需要一个根组件 App */

import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'  // 最简单方法:   引入所有样式, 只打包引入的相关组件的样式, 

// 引入自定义模块,需要加 '.'
import App from './App'

// 渲染app标签, 标签体没有内容, 这里写成自闭合的
// 将App组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById('root'))

