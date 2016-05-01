import React from 'react';
import {
    Link
} from 'react-router';
import {
    Button,
    Icon,
    Menu,
    Dropdown,
    message
} from 'antd';
const DropdownButton = Dropdown.Button;
import AuthStore from "../stores/auth";
AuthStore.init();

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            user: AuthStore.getUser()
        };
    }
    singout() {
        AuthStore.signOut((err, res) => {
            if (!err) {
                message.success('退出成功!', 3);
                this.props.history.replace({
                    pathname: 'login'
                })
            }
        });
    }
    loginStateChange(user) {
        if (!user) {
            this.props.history.replace({
                pathname: 'login'
            })
        }
        this.setState({
            user: user
        })
    }
    componentDidMount() {
        AuthStore.addChangeListener(this.loginStateChange.bind(this));
    }
    componentWillUnmount() {
        AuthStore.removeChangeListener(this.loginStateChange.bind(this));
    }
    render() {
        let isLoginPage = (() => {
            if (this.props.routes.length >= 1) {
                return this.props.routes[1].path == 'login';
            }
        })();
        const userMenu = (
            <Menu>
                <Menu.Item key="2" >
                    <span onClick={this.singout.bind(this)}>退出</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="wrap">
                {!isLoginPage ? 
                <div className="navbar-wrap">
                    <div className="navbar main-wrap">
                        <ul className="nav-left">
                            <li><Link to="/" activeClassName={"active"}>我的项目</Link></li>
                        </ul>
                        <div className="nav-right ttr">
                            <div className="authed">
                                <DropdownButton overlay={userMenu} type="ghost">
                                   <Link to="u">{this.state.user && this.state.user.username}</Link>
                                </DropdownButton>
                                <Link to="addproject">
                                    <Button type="primary" shape="circle" title="添加项目">
                                        <Icon type="plus-circle-o" size="small"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Layout;
