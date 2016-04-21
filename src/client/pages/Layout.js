import React from 'react';
import { Link } from 'react-router';
import {Button, Icon, Menu, Dropdown} from 'antd';
const DropdownButton = Dropdown.Button;
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        };
    }
    render() {
        let isLoginPage = (function(_this){
            debugger;
            if(_this.props.routes.lenth >= 1){
                return _this.props.routes[1].path == 'login';
            }
        })(this);
        const user = {
            name: 'naraku'
        };
        const oprateMenu = (
          <Menu>
            <Menu.Item key="0">
              <a href="http://www.alipay.com/">第一个菜单项</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="http://www.taobao.com/">第二个菜单项</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">第三个菜单项</Menu.Item>
          </Menu>
        );
        const userMenu = (
          <Menu>
            <Menu.Item key="1">个人中❤</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">退出</Menu.Item>
          </Menu>
        );
        return (
            <div className="wrap">
                {isLoginPage ? 
                <div className="navbar-wrap">
                    <div className="navbar main-wrap">
                        <ul className="nav-left">
                            <li><Link to="dashboard" activeClassName={"active"}>工作台</Link></li>
                            <li><Link to="project" activeClassName={"active"}>项目</Link></li>
                            <li><Link to="task" activeClassName={"active"}>任务</Link></li>
                            <li><Link to="status" activeClassName={"active"}>动态</Link></li>
                        </ul>
                        <div className="nav-right ttr">
                            <div className="authed">
                                <DropdownButton overlay={userMenu} type="ghost">
                                    {user.name}
                                </DropdownButton>
                                <Dropdown overlay={oprateMenu} trigger={['click']}>
                                    <Button type="primary" shape="circle">
                                        <Icon type="plus-circle-o" size="small"/>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
                <div className="content main-wrap">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Layout;