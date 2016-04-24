import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';
import Index from './pages/Index';
import Project from './pages/Project';
import ProjectAdd from './pages/ProjectAdd';
import ProjectDetail from './pages/ProjectDetail';
import Task from './pages/Task';
import Status from './pages/Status';
import Login from './pages/Login';

class AppRoutes extends React.Component {
    render() {
        return (
          <Router history={hashHistory}>
              <Route path="/" component={Layout}>
                  <IndexRoute component={Index}/>
                  <Route name="dashboard" path="dashboard" component={Project} />
                  <Route name="project" path="project" component={Project}>
                      <Route name="detail" path="detail" component={ProjectDetail} />
                  </Route>
                  <Route name="addproject" path="addproject" component={ProjectAdd} />
                  <Route name="task" path="task" component={Task} />
                  <Route name="status" path="status" component={Status} />
                  <Route name="login" path="login" component={Login} />
              </Route>
          </Router>
        );
    }
}

export default AppRoutes;
