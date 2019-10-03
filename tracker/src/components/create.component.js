import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Create extends Component {

    state = {
        id: 0,
        name: '',
        description: '',
        man_hours: '',
        image: '',
        owner: ''
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    submitFormAdd = e => {
        e.preventDefault()
        var data = new FormData();
        data.append("name",this.state.name);
        data.append("description",this.state.description);
        data.append("man_hours",this.state.man_hours);
        data.append("image",document.querySelector('input[type="file"]').files[0]);
        data.append("owner",this.state.owner);
        fetch('https://team7-awaaz.herokuapp.com/project/', {
          method: 'post',
          body: data
        }).then(
            response => response.json()
        ).then(item => {
            if(Array.isArray(item)) {
              this.props.addItemToState(item[0])
              this.props.toggle()
            } else {
              console.log('failure')
            }
        }).catch(err => console.log(err))
    }
    
    submitFormEdit = e => {
        e.preventDefault()
        var data = new FormData();
        data.append("name",this.state.name);
        data.append("description",this.state.description);
        data.append("man_hours",this.state.man_hours);
        data.append("image",document.querySelector('input[type="file"]').files[0]);
        data.append("owner",this.state.owner);
        fetch('https://team7-awaaz.herokuapp.com/project/'+this.state.id+'/', {
            method: 'put',
            body: data
        }).then(
            response => response.json()
        ).then(item => {
            if(Array.isArray(item)) {
                // console.log(item[0])
                this.props.updateState(item[0])
                this.props.toggle()
            } else {
                console.log('failure')
            }
        }).catch(err => console.log(err))
    }


    componentDidMount() {
        // if item exists, populate the state with proper data
        if(this.props.item) {
          const { id, name, description, man_hours, image, owner } = this.props.item
          this.setState({ id, name, description, man_hours, image, owner })
        }
    }

    render() {
        return (
          <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" onChange={this.onChange} value={this.state.description === null ? '' : this.state.description}  />
            </FormGroup>
            <FormGroup>
              <Label for="man_hours">Man Hours</Label>
              <Input type="text" name="man_hours" id="man_hours" onChange={this.onChange} value={this.state.man_hours === null ? '' : this.state.man_hours}  />
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input type="file" name="image" id="image" onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label for="owner">owner</Label>
              <Input type="text" name="owner" id="owner" onChange={this.onChange} value={this.state.owner === null ? '' : this.state.owner}/>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        );
    }
}