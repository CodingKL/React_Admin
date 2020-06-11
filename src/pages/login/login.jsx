/* 登陆组件 */
import React, {Component} from 'react'  

import './login.less'
import logo from './images/logo.png'

import { Layout } from 'antd';

import { CaretDownFilled } from '@ant-design/icons'
// import { ArrowsAltOutlined, CopyOutlined, YoutubeOutlined, AudioOutlined, StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Icon, Button } from 'antd';
// import Icon from '@ant-design/icons';

// const Item = Form.Item       // 不能写在import之前!!!   
// const { Header, Footer, Sider, Content } = Layout;

/*
    登陆的路由组件(Admin), 样式通过类名className来控制
*/
/*<div>Login</div>*/
// export default class Login extends Component {
class Login extends Component {

    // 箭头函数, 事件回调函数有一个event
    // 问题:     表单会自动提交
    handleSubmit = (event) => {
        // 阻止事件的默认行为
        event.preventDefault()

        // 得到form对象
        const form = this.props.form  

        // 获取表单项的输入数据
        const values = form.getFieldsValue();
        console.log('handleSubmit()', values)
    }

    // 组件的数据包括外部传入的和自身的数据!!!
    render () {

        // 具有很强大功能的form对象, form对象里面有一个属性getFieldDecorator方法
        const form = this.props.form // this.props.Form   wrong!!! 
        const { getFieldDecorator } = form // getFieldDecorator高阶函数, 该函数有两个参数, 至少传入一个标识名称参数, 

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', { 
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名" 
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('Password', { 
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25 )' }} />} 
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

    // htmlType="submit"    ---->  表明这是一个提交按钮!!!
    // 用户会往里面输东西, 
    //    1.需要进行前台表单验证!!! 
    //    2.后台表单验证  
    //    3.login组件:  收集表单输入数据   
    //  
    // 验证的时机: 输入的过程中, 点击按钮提交的时候!!!   静态组件
    //    前台表单验证与数据收集
    //          用户名/密码的合法性要求
    //      1.必须输入
    //      2.必须大于4位 
    //      3.必须小于12位
    //      4.必须是英文, 数字或下划线组成
    //
    /*
    render() {
        const onFinish = values => {
            console.log('Received values of form: ', values);
        };

        // 自定义antd主题将按钮颜色从蓝色变为绿色
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                        <Form.Item 
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
    */
}

// 返回一个新的组件
// 高阶函数   create, 因为它返回的是一个函数
// 高阶组件

/*
        包装Form组件, 生成一个新的组件: Form(login)
                新组件会向Form组件传递一个强大的对象属性: form
        父子组件, 路由组件接受的三个属性

*/
const WrapLogin = Form.create()(Login)
export default WrapLogin 

/*
    1.前台表单验证
    2.收集表单输入数据
*/