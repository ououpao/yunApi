import React from 'react';
import Codemirror from 'react-codemirror/lib/Codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/monokai.css');
import { Form, Input, Button, Radio, Select, Upload, Icon, Alert, message } from 'antd';
import ApiStore from "../../stores/api";
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
            members: [],
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
        let apiInfo = this.props.form.getFieldsValue(['name', 'url', 'method', 'detail']);
        apiInfo.requestBody = this.state.requestBody;
        apiInfo.responseBody = this.state.responseBody;
        ApiStore.create(this.state.projectUrl, apiInfo, (err, detail) => {
            if (err || !detail) {
                message.error(err.response.text, 3)
                return;
            }
            message.success('添加成功！', 3);
            this.props.history.replace({ pathname: `project/${this.state.projectUrl}/apis/${detail._id}` })
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
    handleChange(value) {
        this.setState({
            members: value
        })
    }
    render() {
        let detail = this.state.detail;
        const options = {
            // mode: "javascript",
            // lineNumbers: true,
            // indentUnit: 4,
            // cursorHeight: 1,
            // styleActiveLine: true,
            // theme: 'monokai'

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
                        <p><label class="col-6"> </label>方式一：搜索添加(员工已有账号)</p>
                        <FormItem
                          {...formItemLayout}
                          label="添加成员：">
                          <Select multiple
                            defaultValue={[]} 
                            onChange={this.handleChange.bind(this)}
                            searchPlaceholder="请选择项目成员">
                            {children}
                          </Select>
                        </FormItem>
                        <p><label class="col-6"> </label>方式二：邀请添加(员工未有账号)</p>
                        <FormItem
                          {...formItemLayout}
                          label="邀请成员：">
                          <Select tags
                            style={{ width: '100%' }}
                            searchPlaceholder="输入后按Enter键添加"
                            onChange={this.handleChange.bind(this)}>
                          </Select>
                        </FormItem>

                        <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24 }}>
                          <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{width: '100%'}}>{this.isEdit ? '确认修改' : '立即添加'}</Button>
                        </FormItem>
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
