import React from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Dropdown, Modal, message ,Tabs} from 'antd';
import ApiStore from '../stores/api';
const TabPane = Tabs.TabPane;

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectUrl: this.props.params.url,
            list: []
        }
    }
    componentWillMount() {
        ApiStore.getList(this.state.projectUrl, (err, list) => {
            if (err) {
                message.error(err, 3);
                return;
            }
            this.setState({
                list: list || []
            })
        })
    }
    render() {
        let _id = this.props.params.id;
        let listItems = [1,2,3,4].map((item, index) => {
            return (
                <li className="item" key={item}>
                    <Link to={`/project/${this.state.projectUrl}/apis/${item}`}>
                        <p>
                            <span className="name">{item}</span> 
                            <span className="time">{item}</span>
                        </p>
                        <p>
                            <span className="owner">{item}</span>
                        </p>
                    </Link>
                    
                </li>
            )
        });
        return (
            <div className="api-module">
                <div className="api-list-wrap">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="指派给我" key="1">
                        <ul className="list">
                            {listItems}
                        </ul>
                    </TabPane>
                    <TabPane tab="我创建的" key="2">
                        <ul className="list">
                            {listItems}
                        </ul>
                    </TabPane>
                </Tabs>
                    
                </div>
            </div>
        )
    }
}
export default Task;