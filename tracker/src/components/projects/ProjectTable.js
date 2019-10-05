import React, { Component } from 'react';
import ProjectRow from './ProjectRow';
import ProjectForm from './ProjectForm'

export default class ProjectTable extends Component {

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

    addItemToState = (item) => {
      this.setState(prevState => ({
        items: [...prevState.items, item]
      }))
    }

    updateState = (item) => {
      const itemIndex = this.state.items.findIndex(data => data.id === item.id)
      const newArray = [
      // destructure all items from beginning to the indexed item
        ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
        item,
      // add the rest of the items to the array from the index after the replaced item
        ...this.state.items.slice(itemIndex + 1)
      ]
      this.setState({ items: newArray })
    }

    deleteItemFromState = (id) => {
      const updatedItems = this.state.items.filter(item => item.id !== id)
      this.setState({ items: updatedItems })
    }

    tabRow(updateState, deleteItemFromState) {
      return this.state.items.map(function(project, id) {
          return <ProjectRow obj={project} key={id} updateState={updateState} deleteItemFromState={deleteItemFromState}/>;
      });
    }

    render() {
        return (
          <div>
            <h3 align="center">All Projects</h3>
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
                { this.tabRow(this.updateState, this.deleteItemFromState) }
              </tbody>
            </table>
            <ProjectForm buttonLabel="Add Project" addItemToState={this.addItemToState}/>
          </div>
        );
    }
}