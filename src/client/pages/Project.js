import React from 'react';
import { Link } from 'react-router';
import ProjectStore from '../stores/project'

class Project extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentWillMount(){
    	ProjectStore.getAll((err, list) => {
            this.setState({
                projects: list
            })
    	})
    }
    componentDidMount() {
        document.title = "我的项目";
    }
    render() {
        var items = this.state.projects.map(function (item) {
            return (
                <Link to={`/project/${item.url}`}>
                    <li className="item">
                        <p>{item.name}</p>
                        <p>{item.owner}</p>
                    </li>
                </Link>
            );
        });
        return ( 
        	<div>
        		{!this.props.children ?
    			<ul className="projects">
                    {items}
    			</ul>
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
