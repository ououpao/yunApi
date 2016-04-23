import React from 'react';
import { Modal, Tabs, Form, Input, Button, Checkbox, Radio, Tooltip, Icon, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
import AuthStore from "../stores/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }
    loginHandle(e) {
        e.preventDefault();
        let user = this.props.form.getFieldsValue(['loginEmail', 'pass']);
        user.username = user.loginEmail;
        user.password = user.pass;
        AuthStore.signIn(user, (err, _user) => {
            if (err || !user) {
                message.error(err.response.text, 3)
                return;
            }
            message.success('登录成功!', 3)
        });
    }
    regHandle(e) {
        e.preventDefault();
        let user = this.props.form.getFieldsValue(['username', 'email', 'password']);
        AuthStore.signUp(user, (err, _user) => {
            if (err || !user) {
                message.error(err.response.text, 3)
            }else{
                message.success('注册成功, 请登录!', 3)
            }
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="login">
              <div className="login-cell">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="登录" key="1">
                        <Form horizontal onSubmit={this.loginHandle.bind(this)}>
                            <FormItem
                              {...formItemLayout}
                              label="邮箱：">
                              <Input type="text" {...getFieldProps('loginEmail')} placeholder="请输入电子邮箱" />
                            </FormItem>
                            <FormItem
                              {...formItemLayout}
                              label="密码：">
                              <Input type="password" {...getFieldProps('pass')} placeholder="请输入密码" />
                            </FormItem>
                            <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24 }}>
                              <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{width: '100%'}}
                                loading={this.state.loading}>确定</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                        <Form horizontal onSubmit={this.regHandle.bind(this)}>
                            <FormItem
                              {...formItemLayout}
                              label="用户名：">
                              <Input type="text" {...getFieldProps('username')} placeholder="请输入用户名" />
                            </FormItem>
                            <FormItem
                              {...formItemLayout}
                              label="邮箱：">
                              <Input type="text" {...getFieldProps('email')} placeholder="请输入邮箱" />
                            </FormItem>
                            <FormItem
                              {...formItemLayout}
                              label="密码：">
                              <Input type="password" {...getFieldProps('password')} placeholder="请输入密码" />
                            </FormItem>
                            <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24 }}>
                              <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{width: '100%'}}
                                loading={this.state.loading}>确定</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                  </Tabs>
              </div>
            </div>
        );
    }
};
Login = Form.create()(Login);
export default Login;

