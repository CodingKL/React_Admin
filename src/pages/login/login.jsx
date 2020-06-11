/* 登陆组件 */
import React, {Component} from 'react'  

import './login.less'
import logo from './images/logo.png'

import { Layout, message } from 'antd';

import { CaretDownFilled } from '@ant-design/icons'
// import { ArrowsAltOutlined, CopyOutlined, YoutubeOutlined, AudioOutlined, StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Icon, Button } from 'antd';
// import Icon from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'

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
        // 这里是阻止事件的默认行为, 还有一种是停止事件冒泡!!!
        event.preventDefault()

        // 点击登陆按钮的时候, 还需要做Form的统一验证
        // 对所有的表单字段进行校验
        // this.props.form得到form对象
        // values对象
        this.props.form.validateFields(async (err, values) => {
            
            if (!err) {
              // 校验成功
              // console.log('Received values of form: ', values);
              console.log('提交登陆的ajax请求', values);

              // 表单验证通过后

              // 请求登陆
              const {username, password} = values   // 解构参数, 注意参数名保持一致!!!
              /*
              reqLogin(username, password).then(response => {
                  console.log('ok', response.data)
              }).catch(error => {
                  console.log('失败了', error)
              })
              */
             /*
             try 
             {
                const response = await reqLogin(username, password) 
                console.log('请求成功', response.data);  
             } catch(error) {
                console.log('请求出错了', error);  
             }*/

             //const response = await reqLogin(username, password) 
             // console.log('请求成功', response.data); // 请求成功并不能代表登陆成功!!!
             const result = await reqLogin(username, password) 
             // const result = response.data // {status: 0, data: user} {status: 1, msg: 'xxx'}   
             if (result.status===0) { // 登陆成功
                // 提示登陆成功
                message.success('登陆成功')
                
                // 保存user
                const user = result.data
                memoryUtils.user = user    // 保存在内存中

                // 跳转到管理界面(不需要再回退回到登陆)
                this.props.history.replace('/')
             } else {  // 登陆失败
                // 提示错误信息
                message.error(result.msg)
             }
            } else {
              console.log('校验失败', values);
            }
            
        });

        // 得到form对象
        const form = this.props.form  

        // 获取表单项的输入数据
        const values = form.getFieldsValue();
        console.log('handleSubmit()', values)
    }

    /*
        对密码进行自定义验证, 
           validator	自定义校验（注意，callback 必须被调用）	function(rule, value, callback)
        是一个回调函数, 函数形参是指定好了的三个参数!!!  rule, value, callback
        value输入的密码, 注意，callback 必须被调用, 
    */
    /*
    用户名/密码的合法性要求
        1.必须输入
        2.必须大于4位 
        3.必须小于12位
        4.必须是英文, 数字或下划线组成 
    */
    validatePwd = (rule, value, callback) => {

        console.log('validatePwd()', rule, value)

        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文, 数字或下划线组成')
        } else {
            callback()             // 验证通过
            // callback('xxxx')    // 验证失败, 并指定提示的文本    
        }

    
    }

    // this.props.form.getFieldDecorator(id, options)
    //          https://3x.ant.design/components/form-cn/
    //  

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
                            {
                                    /*
                                        用户名/密码的合法性要求
                                            1.必须输入
                                            2.必须大于4位 
                                            3.必须小于12位
                                            4.必须是英文, 数字或下划线组成 
                                    */
                            }
                            {getFieldDecorator('username', { 
                                /* 指定验证规则,  配置对象: 属性名是特定的一些名称, */
                                /*   /^[a-zA-Z0-9_]+$/ 有了+号可以匹配任意多的字符 */
                                // 声明式验证, 直接使用别人定义好的验证规则进行验证!!!
                                rules: [
                                    { required: true, whitespace: true, message: '用户名必须输入' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文, 数字或下划线组成' }
                                ],
                                initialValue: 'admin'    // 指定初始值
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名" 
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', { 
                                rules: [
                                    { 
                                        validator: this.validatePwd 
                                    }
                                ],
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
    // 验证时机有两个:    输入框输入数据的时候, 点击登陆按钮提交的时候
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
//      1).一类特别的函数
//              a.接收函数类型的参数
//              b.函数的返回值是函数
//      2).常见的高阶函数
//              a.定时器:    setTimeout() / setInterval()
//              b.Promise:  Promise(() => {})  then(value => {}, reason => {})
//              c.数组遍历相关的方法:  forEach()/filter()/map()/reduce()/find()/findIndex()              
//              d.函数对象的bind方法, 返回一个新的方法:   fn.bind()
//              e.Form.create()()  /  getFieldDecorator()()
//
//      3).高阶函数更新动态, 更加具有扩展性
//            一个函数代表了一种动态的功能, 函数如果能接收一个函数, 就接受了一种变化的功能, 返回一个函数就返回了以后一种可以反复使用的功能!!!
//

// 高阶组件
//          1).本质就是一个函数
//          2).参数接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性, 这两个组件的关系是父子组件
//          3).作用:   扩展组件的功能
//          4).高阶组件也是高阶函数:  接收一个组件函数, 返回是一个新的组件函数
//
//  渲染包装以后的高阶组件WrapLogin:    const WrapLogin = Form.create()(Login), 有了包装组件, login组件才能进一步完成所有其它的功能
//  
//  组件与组件的标签对象的关系;   组件是一个类型, 标签是组件的某一个实例, 高阶组件是用来包装组件类型的, 不是实例!!!
//
//  高阶组件(组件函数)   ------>   返回一个新的组件
//  
//

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

/*
        async和await

        1.作用
            简化promise对象的使用:  不用再使用then()来指定成功/失败的回调函数
            以同步编码方式(没有写回调函数)实现异步流程, 有回调函数就是异步编码方式!!!

        2.哪里写async
            await所在函数(最近)定义的左侧写async

        3.哪里写await
            在返回promise的表达式的左侧写await:  不想要promise, 想要promise异步执行的成功的value数据
*/