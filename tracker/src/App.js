import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ProjectTable from './components/projects/ProjectTable';
import TaskTable from './components/tasks/TaskTable';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/projects'} className="nav-link">Projects</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/tasks'} className="nav-link">Tasks</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to Awaaz.de</h2> <br/>
          <Switch>
              <Route exact path='/tasks' component={ TaskTable } />
              <Route exact path='/projects' component={ ProjectTable } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;