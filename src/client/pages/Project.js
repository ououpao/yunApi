import React from 'react';
import ProjectStore from '../stores/project'

class Project extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentWillMount(){
    	ProjectStore.getAll(function(err, list){
    		
    	})
    }
    componentDidMount() {
        document.title = "我的项目";
    }
    render() {
        return ( 
        	<div>
        		{!this.props.children ?
    			<div>
    				<h3>Project page</h3> 
    			</div>
        		:
        		<div>
        		 	{this.props.children}
        		</div>
        		}
            </div>
        );
    }
}

export default Project;
