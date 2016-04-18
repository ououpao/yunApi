import React from 'react';
import { Link } from 'react-router';
import {Button} from 'antd';
import Login from '../components/Login';
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: false,
            login: false
        };
    }
    showLogin(){
        this.setState({
            loginVisible: true
        })
    }
    hideLogin(){
        this.setState({
            loginVisible: false
        })
    }
    render() {
        const user = {
            name: 'naraku'
        };
        return (
            <div className="wrap">
                <div className="navbar">
                    <ul className="nav-left">
                        <li><Link to="/">工作台</Link></li>
                        <li><Link to="project">项目</Link></li>
                        <li><Link to="task">任务</Link></li>
                        <li><Link to="status">动态</Link></li>
                    </ul>
                    <div className="nav-right ttr">
                        {this.state.login ? 
                            <span>{user.name}</span> : 
                            <div>
                                <Button type="primary" onClick={this.showLogin.bind(this)}>登陆/注册</Button>
                                <Login visible={this.state.loginVisible} hide={this.hideLogin.bind(this)}></Login>
                            </div>
                        }
                    </div>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Layout;