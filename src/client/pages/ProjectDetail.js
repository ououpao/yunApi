import React from 'react';
import { Button, Icon} from 'antd';
import ProjectStore from '../stores/project';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
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
        let detail = this.state.detail;
        return (
            <div className="project-detal">
                <div className="pro-navbar-wrap">
                    <div className="main-wrap">
                        <img className="detail-icon" src='https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png' alt="项目icon"/>
                        <div className="detail-info">
                            <p className="name">{detail.name}</p>
                            <p>创建日期： {detail.createDate && detail.createDate.substr(0, 10)}</p>
                            <p className="detail-text">{detail.detail || '暂无描述'}</p>
                        </div>
                        <div className="edit-btn">
                            <Button type="ghost" shape="circle" title="修改">
                                <Icon type="setting" size="small"/>
                            </Button>
                        </div>
                        <ul className="pro-navbar">
                            <li className="active">接口列表</li>
                            <li>任务列表</li>
                            <li>项目成员</li>
                            <li>项目统计</li>
                        </ul>
                    </div>
                </div>
                <div className="pro-detail">content</div>
            </div>
        )
    }
}
export default ProjectDetail;
