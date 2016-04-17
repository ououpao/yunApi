import React from 'react';
import {Modal, Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }
    handleSubmit(e) {
        this.setState({
            loading: true
        })
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
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
                    title="登录" 
                    visible={this.props.visible} 
                    onCancel={this.props.hide}
                    footer={[]}>
                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem
                          {...formItemLayout}
                          label="用户名：">
                          <Input type="text" {...getFieldProps('username')} placeholder="请输入用户名" />
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
                </Modal>
		    </div>
        );
    }
};
Login = Form.create()(Login);
export default Login;
