import React from 'react';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router';
import ProjectStore from '../stores/project'
import projectImg from '../imgs/project.png';
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
                <li className="item app-col-6 app-col-mb-12" key={item._id}>
                        <Link to={`/project/${item.url}/apis`}>
                            <div className="detail">
                                <img className="detail-icon" src={projectImg} alt="项目icon"/>
                                <div className="detail-info">
                                    <p className="name">{item.name}</p>
                                    <p>创建日期： {item.time.substr(0, 10)}</p>
                                    <p className="count">
                                        <span title="成员数量">{item.members.length}<Icon type="user" /></span>
                                        <span title="接口数量">{item.apis.length}<Icon type="link" /></span>
                                        <span title="任务数量">{item.tasks.length}<Icon type="book" /></span>
                                    </p>
                                    <ul></ul>
                                </div>
                            </div>
                        </Link>
                    </li>
            );
        });
        return (
            <div>
                <div className="main-wrap module project-module ">
                    <header className="module-header">
                        <span>我的项目（{items.length}）</span>
                    </header>
                    <div className="module-body">
                        <ul className="project-list app-row">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectList;
