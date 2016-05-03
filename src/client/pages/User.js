import React from 'react';
import { Link } from 'react-router';
import { Form, Input, Upload, Button, Icon, Menu, Dropdown, Modal, message, Badge, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import AuthStore from "../stores/auth";
import UserStore from "../stores/user";
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: AuthStore.getUser() || {},
            getByIdUser: {},
            activepanel: '1',
            isAdded: false
        }
    }
    componentDidMount() {
        document.title = "用户中❤";
        AuthStore.addChangeListener(this.getLoggedInUser.bind(this));
        this.getUserById(this.props.params.id);
    }
    componentWillUnmount() {
        AuthStore.removeChangeListener(this.getLoggedInUser.bind(this));
    }
    componentDidUpdate(preProps) {
        console.log('update')
        let loggedInUser = this.state.loggedInUser,
            getByIdUser = this.state.getByIdUser;
        if (loggedInUser && getByIdUser) {
            if (!this.state.isAdded) {
                if (loggedInUser.friends.indexOf(getByIdUser._id) > -1) {
                    this.setState({
                        isAdded: true
                    })
                }
            }
        }
    }
    getLoggedInUser() {
        this.setState({
            loggedInUser: AuthStore.getUser() || {}
        })
    }
    getUserById(id) {
        UserStore.getUserById(id, (err, user) => {
            this.setState({
                getByIdUser: user || {}
            })
        })
    }
    edit() {
        this.setState({
            activepanel: '2'
        })
    }
    submit(e) {
        e.preventDefault();
        this.setState({
            activepanel: '1'
        })
    }
    addFriend() {
        UserStore.addFriend(this.state.getByIdUser._id, (err, res) => {
            if (!err && res) {
                message.success('操作成功!', 2);
                console.log(this.state.isAdded)
                this.setState({
                    isAdded: !this.state.isAdded
                })
            }
        })
    }
    render() {
        let loggedInUser = this.state.loggedInUser;
        let user = this.state.getByIdUser;
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
        let friends = user.friends && user.friends.map((friend) => {
            return (
                <li>
                    <Link to={`/u/${friend._id}`}>
                        <img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/>
                    </Link>
                </li>
            )
        })
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
                                        <li><label>注册时间</label><span>{user.time}</span></li>
                                    </ul>
                                    <div className="edit-btn">
                                        {user._id == loggedInUser._id ? 
                                        <Button onClick={this.edit.bind(this)} type="ghost" shape="circle" title="修改" size="small">
                                            <Icon type="setting" size="small"/>
                                        </Button>
                                        : ''
                                        }
                                        {user._id != loggedInUser._id ? 
                                        <Button onClick={this.addFriend.bind(this)} type="ghost" size="small" style={{marginLeft: '10px'}}>
                                            <span>{this.state.isAdded ? '取消关注' : '加好友'}</span>
                                        </Button>
                                        : ''
                                        }
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
                            {friends}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
User = Form.create()(User);
export default User;
