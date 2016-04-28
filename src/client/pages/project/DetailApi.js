import React from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Dropdown, Modal, message } from 'antd';
import ApiStore from '../../stores/api';

class ProjectDetailApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectUrl: this.props.params.url,
            list: []
        }
    }
    componentWillMount() {
        ApiStore.getList(this.state.projectUrl, (err, list) => {
            if (err) {
                message.error(err, 3);
                return;
            }
            this.setState({
                list: list || []
            })
        })
    }
    removeApi(){

    }
    editApi(){

    }
    render() {
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
        let listItems = this.state.list.map((item, index) => {
            return (
                <li className="item" key={item._id}>
                    <Link to={`/project/${this.state.projectUrl}/apis/${item._id}`}>
                        <p className="name">{item.name}</p>
                        <p>
                            <span className="owner">{item.owner}</span>
                            <span className="time">{item.createDate.substr(0, 10)}</span>
                        </p>
                    </Link>
                    <Dropdown overlay={editMenu} type="ghost" trigger={['click']}>
                        <Button type="ghost" shape="circle" size="small">
                            <Icon type="ellipsis" />
                        </Button>
                    </Dropdown>
                </li>
            )
        });
        return (
            <div className="api-module">
                <div className="api-list-wrap">
                    <div className="header">
                        <span className="api-count">共{this.state.list.length}项</span>
                        <Link to={{ pathname: 'addapi', query: { projectUrl: this.state.projectUrl } }}>
                            <span className="api-add" title="添加API"><Icon type="plus" /></span>
                        </Link>
                    </div>
                    <ul className="list">
                        {listItems}
                    </ul>
                </div>
                <div className="api-detail"></div>
            </div>
        )
    }
}
export default ProjectDetailApi;
