import React from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Dropdown, Modal, message } from 'antd';
import ProjectStore from '../../stores/project';

class ProjectDetailApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectUrl: this.props.params.url,
            list: []
        }
    }
    componentWillMount() {
        ProjectStore.getMemberList(this.state.projectUrl, (err, list) => {
            if (err) {
                message.error(err, 3);
                return;
            }
            this.setState({
                list: list || []
            })
        })
    }
    render() {
        let listItems = this.state.list.map((item, index) => {
            return (
                <li className="item" key={item._id}>
                    <Link to={`/u/${item._id}`}>
                        <p>
                            <span className="font-avart font-avart-small">{item.username && item.username.substr(0, 1).toUpperCase()}</span>
                        </p>
                    </Link>
                </li>
            )
        });
        return (
            <div className="api-module">
                <div className="api-list-wrap">
                    <div className="header">
                        <span className="api-count">共{this.state.list.length}位项目成员</span>
                        <Link to={{ pathname: 'invite', query: { projectUrl: this.state.projectUrl } }}>
                            <span className="api-add" title="添加API"><Icon type="plus" /></span>
                        </Link>
                    </div>
                    <ul className="member-list">
                        {listItems}
                    </ul>
                </div>
            </div>
        )
    }
}
export default ProjectDetailApi;
