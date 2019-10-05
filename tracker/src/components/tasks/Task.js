import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Task extends Component {

    state = {
        id: 0,
        name: '',
        description: '',
        man_hours: '',
        project: '',
        assignee: '',
        start: '',
        end: '',
        possibleProjects: [],
        posibbleAssignees: []
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
        data.append("project",this.state.project);
        data.append("assignee",this.state.assignee);
        data.append("start",this.state.start);
        data.append("end",this.state.end);
        fetch('https://team7-awaaz.herokuapp.com/task/', {
          method: 'post',
          body: data
        }).then(
            response => response.json()
        ).then(items => {
            this.props.addItemToState(items)
            this.props.toggle()
        }).catch(err => console.log(err))
    }
    
    submitFormEdit = e => {
        e.preventDefault()
        var data = new FormData();
        data.append("name",this.state.name);
        data.append("description",this.state.description);
        data.append("man_hours",this.state.man_hours);
        data.append("project",this.state.project);
        data.append("assignee",this.state.assignee);
        data.append("start",this.state.start);
        data.append("end",this.state.end);
        fetch('https://team7-awaaz.herokuapp.com/task/'+this.state.id+'/', {
            method: 'put',
            body: data
        }).then(
            response => response.json()
        ).then(items => {
            this.props.updateState(items)
            this.props.toggle()
        }).catch(err => console.log(err))
    }

    componentWillMount() {
        let posibbleAssignees = []
        let possibleProjects = []
        fetch('https://team7-awaaz.herokuapp.com/user/')
        .then(response => {
            return response.json();
        }).then(data => {
            posibbleAssignees = data.map((item) => {
                return item;
            });
            this.setState({
                posibbleAssignees: posibbleAssignees,
            });
        }).catch(err => console.log(err))

        fetch('https://team7-awaaz.herokuapp.com/project/')
        .then(response => {
            return response.json();
        }).then(data => {
            possibleProjects = data.map((item) => {
                return item;
            });
            this.setState({
                possibleProjects: possibleProjects,
            });
        }).catch(err => console.log(err))
    }


    componentDidMount() {
        // if item exists, populate the state with proper data
        if(this.props.item) {
          const { id, name, description, man_hours, project, assignee, start, end } = this.props.item
          this.setState({ id, name, description, man_hours, project, assignee, start, end })
        }
    }

    render() {

        let posibbleAssignees = this.state.posibbleAssignees;
        let possibleProjects = this.state.possibleProjects;
        let optionAssignees = posibbleAssignees.map((item) =>
                <option key={item.id} value={item.id}>{item.username}</option>
            );

        let optionProjects = possibleProjects.map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>
            );



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
                <Label for="project">Project</Label>
                <Input type="select" name="project" id="project" onChange={this.onChange}>
                    {optionProjects}
                </Input>
                </FormGroup>
                <FormGroup>
                <Label for="assignee">Assignee</Label>
                <Input type="select" name="assignee" id="assignee" onChange={this.onChange} >
                    {optionAssignees}
                </Input>
                </FormGroup>
                <FormGroup>
                <Label for="start">Start</Label>
                <Input type="date" name="start" id="start" onChange={this.onChange} value={this.state.start === null ? '' : this.state.start}/>
                </FormGroup>
                <FormGroup>
                <Label for="end">End</Label>
                <Input type="date" name="end" id="end" onChange={this.onChange} value={this.state.end === null ? '' : this.state.end}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}