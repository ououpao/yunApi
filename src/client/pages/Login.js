import React from 'react';
import { Link } from 'react-router';
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Login extends React.Component {
    handleSubmit(e) {
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
          <div className="login-wrap">
              <div className="login-wrap-container">
                  <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
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
                      <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24}} className="ttr">
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>确定</Button>
                      </FormItem>
                  </Form>
              </div>
          </div>
      );
    }
}

Login = Form.create()(Login);
export default Login;