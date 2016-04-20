import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './pages/Layout';
import Index from './pages/Index';
import Project from './pages/Project';
import Task from './pages/Task';
import Status from './pages/Status';

class AppRoutes extends React.Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Index}/>
          <Route path="dashboard" component={Project} />
          <Route path="project" component={Project} />
          <Route path="task" component={Task} />
          <Route path="status" component={Status} />
        </Route>
      </Router>
    );
  }
}

export default AppRoutes;