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

        if(this.props.match.params.id) {
          fetch('https://team7-awaaz.herokuapp.com/project/'+this.props.match.params.id+'/task/')
          .then(response => response.json())
          .then(items => {
            this.setState({items: items});
          })
          .catch(err => console.log(err))
        } else {
          fetch('https://team7-awaaz.herokuapp.com/task/')
          .then(response => response.json())
          .then(items => {

            this.setState({items: items});
          })
          .catch(err => console.log(err))
        }
        
    }
    
    tabRow() {
        return this.state.items.map(function(task, id) {
            return <TaskRow obj={task} key={id} />;
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
        let display = 'All List';
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
                { this.tabRow() }
              </tbody>
            </table>
            <TaskForm buttonLabel="Add Task" addItemToState={this.addItemToState} deleteItemFromState={this.deleteItemFromState}/>
          </div>
        );
    }
}