import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';
import Index from './pages/Index';
import Task from './pages/Task';
import Login from './pages/Login';

import Project from './pages/project/Project';
import AddProject from './pages/project/AddProject';
import ProjectEdit from './pages/project/Edit';
import ProjectList from './pages/project/List';
import ProjectDetail from './pages/project/Detail';
import ProjectDetailAnalysis from './pages/project/DetailAnalysis';

import ProjectMemberList from './pages/project/MemberList';
import AddMember from './pages/project/AddMember';

import ProjectTaskList from './pages/project/TaskList';
import AddTask from './pages/project/AddTask';

import ApiList from './pages/project/ApiList';
import AddApi from './pages/project/AddApi';
import ApiDetail from './pages/project/ApiDetail';

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
                          <Route name="ApiList" path="apis" component={ApiList}>
                              <Route name="ApiDetail" path=":id" component={ApiDetail} />
                          </Route>
                          <Route name="ProjectTaskList" path="tasks" component={ProjectTaskList} />
                          <Route name="ProjectMemberList" path="members" component={ProjectMemberList} />
                      </Route>
                  </Route>
                  <Route name="addproject" path="addproject" component={AddProject} />
                  <Route name="addapi" path="addapi" component={AddApi} />
                  <Route name="addtask" path="addtask" component={AddTask} />
                  <Route name="addmember" path="addmember" component={AddMember} />
                  <Route name="editproject" path="editproject" component={ProjectEdit} />
                  <Route name="task" path="task" component={Task} />
                  <Route name="login" path="login" component={Login} />
              </Route>
          </Router>
        );
    }
}

export default AppRoutes;
