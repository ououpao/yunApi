import React from 'react';
import ProjectStore from '../stores/project';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.params.url
        };
    }
    componentWillMount() {
        ProjectStore.getDetail(this.state.url, (err, res) => {
          console.log(res);
        })
    }
    render() {
        return (
            <div>{this.state.url}</div>
        )
    }
}
export default ProjectDetail;
