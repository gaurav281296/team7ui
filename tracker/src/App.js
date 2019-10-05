import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ProjectTable from './components/projects/ProjectTable';
import TaskTable from './components/tasks/TaskTable';
import UserTable from './components/users/UserTable';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Awaaz Tracker</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/task'} className="nav-link">Tasks</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/user'} className="nav-link">Users</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to Awaaz.de</h2> <br/>
          <Switch>
              <Route exact path='/' component={ ProjectTable } />
              <Route path='/task' component={ TaskTable } />
              <Route path='/user' component={ UserTable } />
              <Route path='/project/:id/task/' component={TaskTable}/>
          </Switch>
        </div>
      </Router>
      
    );
  }
}

export default App;