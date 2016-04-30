import React from 'react';
import {Form, Input, Upload, Button, Icon, Menu, Dropdown, Modal, message, Badge, Tabs} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import AuthStore from "../stores/auth";
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            activepanel: '1'
        }
    }
    componentDidMount() {
        document.title = "用户中❤";
        console.log(this.state.user)
    }
    getUser() {
        this.setState({
            user: AuthStore.getUser()
        })
        console.log(this.state.user)
    }
    edit(){
        this.setState({
            activepanel: '2'
        })
        console.log(this.state.activepanel)
    }
    submit(e){
        e.preventDefault();
        this.setState({
            activepanel: '1'
        })
    }
    like(){
        message.success('添加成功!', 3)
    }
    componentDidMount() {
        AuthStore.addChangeListener(this.getUser.bind(this));
    }
    componentWillUnmount() {
        AuthStore.removeChangeListener(this.getUser.bind(this));
    }
    render() {
        let user = this.state.user;
        let activepanel = this.state.activepanel;
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
            <div className="main-wrap">
                <div className="user-module">
                    <div className="base-module">
                        <Tabs activeKey={activepanel}>
                            <TabPane tab="选项卡一" key="1">
                                <div>
                                    <p className="user-img">
                                        <img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/>
                                    </p>
                                    <ul className="info">
                                        <li><label>用户名</label><span>{user.username}</span></li>
                                        <li><label>邮箱</label><span>{user.email}</span></li>
                                        <li><label>注册时间</label><span>2015-05-06</span></li>
                                    </ul>
                                    <div className="edit-btn">
                                        <Button onClick={this.edit.bind(this)} type="ghost" shape="circle" title="修改" size="small">
                                            <Icon type="setting" size="small"/>
                                        </Button>
                                        <Button onClick={this.like.bind(this)} type="ghost" title="关注" size="small" style={{marginLeft: '10px'}}>
                                            <span>加好友</span>
                                        </Button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="选项卡二" key="2">
                                <div className="base-edit-module">
                                    <Form horizontal onSubmit={this.submit.bind(this)}>
                                        <FormItem
                                          {...formItemLayout}
                                          label="用户头像：">
                                          <Upload {...props}>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传照片</div>
                                          </Upload>
                                        </FormItem>
                                        <FormItem
                                          {...formItemLayout}
                                          label="用户昵称：" required>
                                          <Input type="text" {...getFieldProps('name')} placeholder="请输入用户昵称"/>
                                        </FormItem>
                                        <FormItem
                                          {...formItemLayout}
                                          label="邮箱：" required>
                                          <Input type="text" {...getFieldProps('name')} placeholder="请输入邮箱地址"/>
                                        </FormItem>
                                        <FormItem wrapperCol={{ span: 14, offset: 6 }} style={{ marginTop: 24 }}>
                                           <Button 
                                            type="ghost" 
                                            htmlType="submit" 
                                            style={{width: '45%'}}>取消
                                           </Button>
                                           <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            style={{width: '45%', marginLeft: '22px'}}>立即修改
                                           </Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className="friend-module">
                        <header>
                            我的好友
                        </header>
                        <ul className="list">
                            <li><img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/></li>
                            <li><img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/></li>
                            <li><img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/></li>
                            <li><img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/></li>
                            <li><img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
User = Form.create()(User);
export default User;
