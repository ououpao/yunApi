import React from 'react';
import {Form, Input, Button, Select, Upload, Icon, Alert} from 'antd';
const FormItem = Form.Item;
import ProjectStore from "../stores/project";

let children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }
    componentDidMount(){
        document.title = "添加项目";
    }
    submit(e){
        e.preventDefault();
        let projectInfo = this.props.form.getFieldsValue(['name', 'detail']);
        projectInfo.members = this.state.members;
        ProjectStore.create(projectInfo, function(err, projectInfo){
            console.log(projectInfo)
        })
    }
    handleChange(value) {
        this.setState({
            members: value
        })
    }

    render() {
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const props = {
          action: '/upload.do',
          listType: 'picture-card',
          defaultFileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          }]
        };
        return ( 
            <div className="add-project">
                <header className="header">
                    <span>创建新项目</span>
                </header>
                <section>
                    <Form horizontal onSubmit={this.submit.bind(this)}>
                        <FormItem
                          {...formItemLayout}
                          label="项目图标：">
                          <Upload {...props}>
                            <Icon type="plus" />
                            <div className="ant-upload-text">上传照片</div>
                          </Upload>
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                          label="项目名称：" required>
                          <Input type="text" {...getFieldProps('name')} placeholder="请输入项目名称" />
                        </FormItem>
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
                        <FormItem
                          {...formItemLayout}
                          label="项目描述：">
                          <Input type="textarea" {...getFieldProps('detail')} placeholder="请输入项目描述" />
                        </FormItem>
                        <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24 }}>
                          <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{width: '100%'}}>立即添加</Button>
                        </FormItem>
                    </Form>
                </section>
                <div class="tip">
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
