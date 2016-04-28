import React from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Dropdown, Modal, message, Badge } from 'antd';
import ApiStore from '../../stores/api';

class ApiDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            projectUrl: this.props.params.projectUrl,
            _id: this.props.params.id
        };
    }
    componentWillMount() {
        ApiStore.getDetail(this.state.projectUrl, this.state._id, (err, detail) => {
            if(err){
                message.error(err, 3);
                return;
            }
            this.setState({
                detail: detail
            })
        })
    }
    render() {
        return (
            <h1>detail</h1>
        )
    }
}
export default ApiDetail;
