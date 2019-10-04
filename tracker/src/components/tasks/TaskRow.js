import React, { Component } from 'react';
import TaskForm from './TaskForm'
import { Button } from 'reactstrap';

class ProjectRow extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete Task forever?')
        if(confirmDelete) {
          fetch('https://team7-awaaz.herokuapp.com/task/'+id, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(item => {
            this.props.deleteItemFromState(id)
          })
          .catch(err => console.log(err))
        }
    }


    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.description}
                </td>
                <td>
                    {this.props.obj.man_hours}
                </td>
                <td>
                    {this.props.obj.project}
                </td>
                <td>
                    {this.props.obj.assignee}
                </td>
                <td>
                    {this.props.obj.start}
                </td>
                <td>
                    {this.props.obj.end}
                </td>
                <td>
                    <div style={{width:"220px"}}>
                        <TaskForm buttonLabel="Edit" item={this.props.obj} updateState={this.props.updateState}/>
                        {' '}
                        <Button color="danger" onClick={() => this.deleteItem(this.props.obj.id)}>Delete</Button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ProjectRow;