import React from 'react';
import Codemirror from 'react-codemirror/lib/Codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/monokai.css');
import { Form, Input, Button, Radio, Select, Upload, Icon, Alert, message } from 'antd';
import ProjectStore from "../../stores/project";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
let children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: [],
            detail: props.detail || {},
            projectUrl: this.props.location.query.projectUrl
        };
        this.isEdit = !!this.state.detail.name;
    }
    componentDidMount() {
        console.log(this.state.projectUrl)
        document.title = this.isEdit ? '修改接口' : '创建新接口';
        if (this.isEdit) {
            this.props.form.setFieldsValue(this.state.detail)
        }
    }
    submit(e) {
        e.preventDefault();
        var email = this.props.form.getFieldsValue(['email']).email;
        if(this.state.email){
            ProjectStore.inviteUser(email, this.state.projectUrl, (err, res) => {
                if(!err){
                    message.success('您的邀请已发送，请耐心等待对方的回应！', 3)
                }
            })
        }else{
            message.error('请填写成员邮箱', 3)
        }
    }
    handleChange(value) {
        this.setState({
            email: value
        })
    }
    updateRequestBody(newValue) {
        this.setState({
            requestBody: newValue
        })
    }
    updateReponseBody(newValue) {
        this.setState({
            responseBody: newValue
        })
    }
    render() {
        let detail = this.state.detail;
        const options = {
            theme: "monokai",
            indentUnit: 4,
            lineNumbers: !0,
            mode: "text/javascript",
            matchBrackets: !0,
            autoCloseBrackets: !0,
        };
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="main-wrap add-project">
                <header className="header">
                    <span>添加项目成员</span>
                </header>
                <section>
                    <Form horizontal onSubmit={this.submit.bind(this)}>
                        <div className="methods">
                            <FormItem
                              {...formItemLayout}
                              label="邮箱：">
                              <Input type="text" {...getFieldProps('email')} placeholder="请输入电子邮箱" />
                            </FormItem>
                            <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24 }}>
                              <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{width: '30%'}}>立即邀请</Button>
                            </FormItem>
                        </div>
                    </Form>
                </section>
                <div className="tip">
                    <Alert message="温馨提示"
                    description="项目成员可在成功添加项目继续添加或邀请未注册的成员！"
                    type="info"
                    showIcon />
                </div>
            </div>
        );
    }
}
AddProject = Form.create()(AddProject);
export default AddProject;
