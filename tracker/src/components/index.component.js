import React, { Component } from 'react';
import TableRow from './TableRow';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { projects: []};
    }

    componentDidMount() {
        fetch('https://team7-awaaz.herokuapp.com/project/')
        .then(response => response.json())
        .then(projects => this.setState({projects}))
        .catch(err => console.log(err))
    }

    tabRow() {
        return this.state.projects.map(function(object, id) {
            return <TableRow obj={object} key={id} />;
        });
    }

    render() {
        return (
          <div>
            <h3 align="center">Projects List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Man hours</th>
                  <th>Image</th>
                  <th>Owner</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow() }
              </tbody>
            </table>
          </div>
        );
    }
}