import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';
import Index from './pages/Index';
import Task from './pages/Task';
import Status from './pages/Status';
import Login from './pages/Login';

import Project from './pages/project/Project';
import ProjectAdd from './pages/project/ProjectAdd';
import ProjectList from './pages/project/ProjectList';
import ProjectDetail from './pages/project/ProjectDetail';
import ProjectDetailApi from './pages/project/ProjectDetailApi';
import ProjectDetailTask from './pages/project/ProjectDetailTask';
import ProjectDetailMembers from './pages/project/ProjectDetailMembers';
import ProjectDetailAnalysis from './pages/project/ProjectDetailAnalysis';

class AppRoutes extends React.Component {
    render() {
        return (
          <Router history={hashHistory}>
              <Route path="/" component={Layout}>
                  <IndexRoute component={Index}/>
                  <Route name="dashboard" path="dashboard" component={Project} />
                  <Route name="project" path="project" component={Project}>
                      <IndexRoute component={ProjectList}/>
                      <Route name="projectDetail" path=":url" component={ProjectDetail}>
                          <IndexRoute component={ProjectDetailApi}/>
                          <Route name="ProjectDetailTask" path="tasks" component={ProjectDetailTask} />
                          <Route name="ProjectDetailMembers" path="members" component={ProjectDetailMembers} />
                          <Route name="ProjectDetailAnalysis" path="analysis" component={ProjectDetailAnalysis} />
                      </Route>
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
