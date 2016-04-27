import React from 'react';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }
    initUser() {
        this.setState({
            user: this.props.location.state
        })
    }
    render() {
        return (
            <div>
                <h3>Index page</h3>
            </div>
        );
    }
}

export default Index;
