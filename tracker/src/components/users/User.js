import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class User extends Component {

    //this.props.match.params.id
    state = {
        id: 0,
        username: '',
        email: ''
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitFormAdd = e => {
        e.preventDefault()
        var data = new FormData();
        data.append("username",this.state.username);
        data.append("email",this.state.email);
        fetch('https://team7-awaaz.herokuapp.com/user/', {
          method: 'post',
          body: data
        }).then(
            response => response.json()
        ).then(users => {
            if(Array.isArray(users)) {
              this.props.addprojectsToState(users[0])
              this.props.toggle()
            } else {
              console.log('failure')
            }
        }).catch(err => console.log(err))
        this.props.toggle();
    }
    
    submitFormEdit = e => {
        e.preventDefault()
        var data = new FormData();
        data.append("username",this.state.username);
        data.append("email",this.state.email);
        fetch('https://team7-awaaz.herokuapp.com/user/'+this.state.id+'/', {
            method: 'put',
            body: data
        }).then(
            response => response.json()
        ).then(users => {
            if(Array.isArray(users)) {
                // console.log(projects[0])
                this.props.updateState(users[0])
                this.props.toggle()
            } else {
                console.log('failure')
            }
        }).catch(err => console.log(err))
        this.props.toggle();
    }


    componentDidMount() {
        // if item exists, populate the state with proper data
        if(this.props.item) {
          const { id, username, email } = this.props.item
          this.setState({ id, username, email })
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" onChange={this.onChange} value={this.state.username === null ? '' : this.state.username} />
                </FormGroup>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}