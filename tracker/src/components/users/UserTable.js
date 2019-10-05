import React, { Component } from 'react';
import UserRow from './UserRow';
import UserForm from './UserForm'

export default class UserTable extends Component {

    constructor(props) {
        super(props);
        this.state = { items: []};
    }

    componentDidMount() {
        fetch('https://team7-awaaz.herokuapp.com/user/')
        .then(response => response.json())
        .then(items => this.setState({items}))
        .catch(err => console.log(err))
    }

    tabRow(updateState, deleteItemFromState) {
        return this.state.items.map(function(user, id) {
            return <UserRow obj={user} key={id} updateState={updateState} deleteItemFromState={deleteItemFromState} />;
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
        return (
          <div>
            <h3 align="center">User List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow(this.updateState, this.deleteItemFromState) }
              </tbody>
            </table>
            <UserForm buttonLabel="Add User" addItemToState={this.addItemToState}/>
          </div>
        );
    }
}