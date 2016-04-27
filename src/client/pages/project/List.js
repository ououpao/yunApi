import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router';
import ProjectStore from '../../stores/project'

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentWillMount() {
        ProjectStore.getAll((err, list) => {
            this.setState({
                projects: list
            })
        })
    }
    componentDidMount() {
        document.title = "项目列表";
    }
    render() {
        var items = this.state.projects.map(function(item) {
            return (
                <li className="item app-col-4 app-col-mb-12" key={item._id}>
                        <Link to={`/project/${item.url}/apis`}>
                            <div className="detail">
                                <img className="detail-icon" src={item.icon} alt="项目icon"/>
                                <div className="detail-info">
                                    <p className="name">{item.name}</p>
                                    <p>创建日期： {item.createDate.substr(0, 10)}</p>
                                    <p>项目成员： </p>
                                    <ul></ul>
                                </div>
                            </div>
                        </Link>
                    </li>
            );
        });
        return (
            <div>
                <ul className="main-wrap project-list app-row">
                    {items}
                </ul>
            </div>
        );
    }
}

export default ProjectList;
