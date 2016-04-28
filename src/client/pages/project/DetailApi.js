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
            if(err){
                message.error(err, 3);
                return;
            }
            this.setState({
                list: list
            })
        })
    }
    render() {
        let listItems = this.state.list.map((item, index) => {
            return (
                <li>{item.name}</li>
            )
        });
        return (
            <div className="api-module">
                <div className="api-list-wrap">
                    <div className="header">
                        <span className="api-count">共5项</span>
                        <Link to={{ pathname: 'addapi', query: { projectUrl: this.state.url } }}>
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
