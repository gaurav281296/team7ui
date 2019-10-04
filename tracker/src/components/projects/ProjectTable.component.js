import React, { Component } from 'react';
import ProjectRow from './ProjectRow';
import ProjectFrom from './ProjectForm.component'

export default class ProjectsTable extends Component {

    constructor(props) {
        super(props);
        this.state = { items: []};
    }

    componentDidMount() {
        fetch('https://team7-awaaz.herokuapp.com/project/')
        .then(response => response.json())
        .then(items => this.setState({items}))
        .catch(err => console.log(err))
    }

    tabRow() {
        return this.state.items.map(function(project, id) {
            return <ProjectRow obj={project} key={id} />;
        });
    }

    addItemToState = (item) => {
      this.setState(prevState => ({
        items: [...prevState.items, item]
      }))
    }

    deleteItemFromState = (id) => {
      const updatedItems = this.state.items.filter(item => item.id !== id)
      this.setState({ items: updatedItems })
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow() }
              </tbody>
            </table>
            <ProjectFrom buttonLabel="Add Project" addItemToState={this.addItemToState} deleteItemFromState={this.deleteItemFromState}/>
          </div>
        );
    }
}