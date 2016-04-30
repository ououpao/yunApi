import React from 'react';
import { Link, Tag } from 'react-router';
import Codemirror from 'react-codemirror/lib/Codemirror';
import { Form, Input, Button, Icon, message, Modal, Badge, Dropdown, Menu } from 'antd';
const FormItem = Form.Item;
import ApiStore from '../../stores/api';

class ApiDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            projectUrl: this.props.params.url,
            _id: this.props.params.id
        };
    }
    componentWillMount() {
        ApiStore.getDetail(this.state.projectUrl, this.state._id, (err, detail) => {
            if (err) {
                message.error(err, 3);
                return;
            }
            this.setState({
                detail: detail
            })
        })
    }
    removeApi() {
        let remove = () => {
            ApiStore.remove(this.state.projectUrl, this.state._id, (err, res) => {
                if (err || !res) {
                    message.error(err, 3);
                    return;
                }
                message.success('删除成功！', 3);
                this.props.history.replace({ pathname: `project/${this.state.projectUrl}/apis` })
            })
        }
        Modal.confirm({
            title: '警告',
            content: '是否删除改接口，不可恢复！',
            okText: '删除',
            cancelText: '取消',
            onOk: remove
        });
    }
    editApi() {

    }
    render() {
        let detail = this.state.detail;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldProps } = this.props.form;
        const editMenu = (
            <Menu>
            <Menu.Item key="1">
                <span onClick={this.editApi.bind(this)}>修改</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2" >
                <span onClick={this.removeApi.bind(this)}>删除</span>
            </Menu.Item>
          </Menu>
        );
        const options = {
            theme: "monokai",
            indentUnit: 4,
            lineNumbers: true,
            mode: "text/javascript",
            matchBrackets: true,
            autoCloseBrackets: true,
            readOnly: true
        };
        return (
            <div className="detail-wrap">
                <header className="header">
                    <h3>{detail.name}</h3>
                    <p><span>{detail.owner}</span></p>
                    <p><span>{detail.time}</span></p>
                    <Dropdown overlay={editMenu} type="ghost" trigger={['click']}>
                        <Button type="ghost" shape="circle" size="small">
                            <Icon type="ellipsis" />
                        </Button>
                    </Dropdown>
                </header>
                <section className="body-main">
                    <p>请求方式：<span className="method">{detail.method}</span></p>
                    <p>请求URL：<span className="url">{detail.url}</span></p>
                    <p>请求参数：</p>
                    <Codemirror value={detail.requestBody && detail.requestBody[0]} options={options} />
                    <p>响应模板：</p>
                    <Codemirror value={detail.responseBody && detail.responseBody[0]} options={options} />
                    <p>详细描述：</p>
                    <p className="detail">
                        阿萨德发送到分乐尽哀生电话费交阿克苏地方哈师大覅那usd回复收到货您符合是滴
                    </p>
                    <div className="comment">
                        <p>全部回复</p>
                        <ul>
                            <li>
                                <header>
                                    <img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/>
                                    <span className="name">naraku</span>
                                    <span className="time">2015-10-10 08:00</span>
                                </header>
                                <div className="content">
                                    接口返回有点问题
                                </div>
                            </li>
                            <li>
                                <header>
                                    <img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/>
                                    <span className="name">naraku</span>
                                    <span className="time">2015-10-10 08:00</span>
                                </header>
                                <div className="content">
                                    那里有问题
                                </div>
                            </li>
                            <li>
                                <header>
                                    <img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/>
                                    <span className="name">naraku</span>
                                    <span className="time">2015-10-10 08:00</span>
                                </header>
                                <div className="content">
                                    date参数有无
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="add-comment">
                        <FormItem
                          label="">
                          <Input type="textarea" {...getFieldProps('detail')} placeholder="请输入评论内容"/>
                        </FormItem>
                        <FormItem wrapperCol={{ span: 3, offset: 21 }} style={{ marginTop: 24 }}>
                          <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{width: '100%'}}>添加评论
                          </Button>
                        </FormItem>
                    </div>
                </section>
            </div>
        )
    }
}
ApiDetail = Form.create()(ApiDetail);
export default ApiDetail;
