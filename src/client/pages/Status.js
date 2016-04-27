import React from 'react';
class Status extends React.Component {
    componentDidMount() {
        document.title = "全部状态";
    }
    render() {
        return (
            <div>
                <h3>Index page</h3>
            </div>
        );
    }

}
export default Status;
