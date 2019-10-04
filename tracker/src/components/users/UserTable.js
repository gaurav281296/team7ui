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

    tabRow() {
        return this.state.items.map(function(user, id) {
            return <UserRow obj={user} key={id} />;
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
                { this.tabRow() }
              </tbody>
            </table>
            <UserForm buttonLabel="Add User" addItemToState={this.addItemToState} deleteItemFromState={this.deleteItemFromState}/>
          </div>
        );
    }
}