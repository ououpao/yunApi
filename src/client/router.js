import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';
import Index from './pages/Index';
import Task from './pages/Task';
import Login from './pages/Login';
import User from './pages/User';

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
                  <Route path="project" component={Project}>
                      <Route path=":url" component={ProjectDetail}>
                          <Route path="apis" component={ApiList}>
                              <Route path=":id" component={ApiDetail} />
                          </Route>
                          <Route path="tasks" component={ProjectTaskList} />
                          <Route path="members" component={ProjectMemberList} />
                      </Route>
                  </Route>
                  <Route path="addproject" component={AddProject} />
                  <Route path="addapi" component={AddApi} />
                  <Route path="addtask" component={AddTask} />
                  <Route path="addmember" component={AddMember} />
                  <Route path="editproject" component={ProjectEdit} />
                  <Route path="task" component={Task} />
                  <Route path="login" component={Login} />
                  <Route path="u" component={User}>
                      <Route path=":id" component={User} />
                  </Route>
              </Route>
          </Router>
        );
    }
}

export default AppRoutes;
