import React from 'react';
import { Button, Icon, Menu, Dropdown, Modal, message} from 'antd';
import ProjectStore from '../../stores/project';

class ProjectDetailApi extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="api-module">
            	<div className="api-list-wrap">
            		<div className="header"></div>
            		<div class="list"></div>
            	</div>
            	<div className="api-detail"></div>
            </div>
        )
    }
}
export default ProjectDetailApi;
