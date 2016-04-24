import React from 'react';
import ProjectStore from '../stores/project';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: null,
            url: this.props.params.url
        };
    }
    componentWillMount() {
        ProjectStore.getDetail(this.state.url, (err, detail) => {
            this.setState({
                detail: detail
            })
        })
    }
    componentDidMount(){
        document.title = '项目详情';
    }
    render() {
        return (
            <div>{this.state.url}</div>
        )
    }
}
export default ProjectDetail;
