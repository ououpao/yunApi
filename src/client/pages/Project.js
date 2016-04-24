import React from 'react';
import { Link } from 'react-router';
import ProjectStore from '../stores/project'

class Project extends React.Component {
	constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.title = "我的项目";
    }
    render() {
        return ( 
        	<div>
        		<div>
        		 	{this.props.children}
        		</div>
            </div>
        );
    }
}

export default Project;
