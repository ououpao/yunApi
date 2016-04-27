import React from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Dropdown, Modal, message } from 'antd';
import ProjectStore from '../../stores/project';

class ProjectDetailApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.params.url
        }
    }
    render() {
        return (
            <div className="api-module">
                <div className="api-list-wrap">
                    <div className="header">
                        <span className="api-count">共5项</span>
                        <Link to={{ pathname: 'addapi', query: { projectUrl: this.state.url } }}>
                            <span className="api-add" title="添加API"><Icon type="plus" /></span>
                        </Link>
                    </div>
                    <div className="list">

                    </div>
                </div>
                <div className="api-detail"></div>
            </div>
        )
    }
}
export default ProjectDetailApi;
