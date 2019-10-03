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