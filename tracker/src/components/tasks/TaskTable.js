import React, { Component } from 'react';
import TaskRow from './TaskRow';
import TaskForm from './TaskForm'

export default class TaskTable extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          items: []
        };
    }

    componentDidMount() {
        let url = ''
        if(this.props.match.params.id) {
          url = 'https://team7-awaaz.herokuapp.com/project/'+this.props.match.params.id+'/task/'
        } else {
          url = 'https://team7-awaaz.herokuapp.com/task/'
        }

        fetch(url)
        .then(response => response.json())
        .then(items => {
          this.setState({items: items});
        }).catch(err => console.log(err))
    }
    
    tabRow(updateState, deleteItemFromState) {
        return this.state.items.map(function(task, id) {
            return <TaskRow obj={task} key={id} updateState={updateState} deleteItemFromState={deleteItemFromState}/>;
        });
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

    render() {
        let display = 'All Tasks';
        if (this.props.match.params.id) {
          display = 'Tasks in the Project';
        }
        return (
          <div>
            <h3 align="center">{display}</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Man hours</th>
                  <th>Project</th>
                  <th>Assignee</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow(this.updateState, this.deleteItemFromState) }
              </tbody>
            </table>
            <TaskForm buttonLabel="Add Task" addItemToState={this.addItemToState} />
          </div>
        );
    }
}