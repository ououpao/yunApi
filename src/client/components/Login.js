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
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }
    loginHandle(e) {
        e.preventDefault();
    }
    regHandle(e) {
        e.preventDefault();
        var user = this.props.form.getFieldsValue(['username', 'email', 'password']);
        AuthStore.signUp(user, (err, _user) => {
            if (err || !user) {
                message.error(err.response.text, 3)
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
            <div>
              <Modal 
                  visible={this.props.visible} 
                  onCancel={this.props.hide}
                  footer={[]}>
                  <Tabs defaultActiveKey="2">
                      <TabPane tab="登录" key="1">
                          <Form horizontal onSubmit={this.loginHandle.bind(this)}>
                              <FormItem
                                {...formItemLayout}
                                label="用户名：">
                                <Input type="text" {...getFieldProps('user')} placeholder="请输入用户名" />
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
                                label="email：">
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
              </Modal>
            </div>
        );
    }
};
Login = Form.create()(Login);
export default Login;
