import React from 'react';
import Codemirror from 'react-codemirror/lib/Codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/theme/monokai.css');
import { Form, Input, Button, Radio, Select, Upload, Icon, Alert, message, DatePicker } from 'antd';
import ApiStore from "../../stores/api";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
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
        document.title = this.isEdit ? '修改任务' : '创建新任务';
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
    changeTimeRange(){

    }
    render() {
        let detail = this.state.detail;
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="main-wrap add-project">
                <header className="header">
                    <span>{this.isEdit ? '修改任务' : '创建新任务'}</span>
                </header>
                <section>
                    <Form horizontal onSubmit={this.submit.bind(this)}>
                        <FormItem
                          {...formItemLayout}
                          label="任务名称：" required>
                          <Input type="text" {...getFieldProps('name')} placeholder="请输入任务名称"/>
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="任务指派：" required>
                          <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择人员"
                            optionFilterProp="children"
                            notFoundContent="无法找到"
                            searchPlaceholder="输入关键词"
                            onChange={this.handleChange.bind(this)}>
                            <Option value="jack">杰克</Option>
                            <Option value="lucy">露西</Option>
                            <Option value="tom">汤姆</Option>
                          </Select>
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="时间安排：" required>
                          <RangePicker style={{ width: 200 }} onChange={this.changeTimeRange.bind(this)} />
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="任务描述：">
                          <Input type="textarea" {...getFieldProps('detail')} placeholder="请输入接口描述"/>
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
