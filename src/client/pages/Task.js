import React from 'react';

class Task extends React.Component {
    componentDidMount() {
        document.title = "我的任务";
    }
    render() {
        return (
            <div>
	            <h3> Task page </h3> 
            </div>
        );
    }
}

export default Task;
