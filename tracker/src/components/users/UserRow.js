import React, { Component } from 'react';
import UserForm from './UserForm'
import { Button } from 'reactstrap';

class UserRow extends Component {

    deleteItem = id => {
        let confirmDelete = window.confirm('Delete User forever?')
        if(confirmDelete) {
          fetch('https://team7-awaaz.herokuapp.com/user/'+id, {
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
                    {this.props.obj.username}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    <div style={{width:"220px"}}>
                        <UserForm buttonLabel="Edit" item={this.props.obj} updateState={this.props.updateState}/>
                        {' '}
                        <Button color="danger" onClick={() => this.deleteItem(this.props.obj.id)}>Delete</Button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default UserRow;