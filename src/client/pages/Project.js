import React from 'react';

class Project extends React.Component {
    componentDidMount() {
        document.title = "我的项目";
    }
    render() {

        return ( < div >
            < h3 > Project page < /h3> < /div>
        );
    }
}

export default Project;
