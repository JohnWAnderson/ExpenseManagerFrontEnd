import React from 'react';
import { signin, ACCESS_TOKEN } from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {UserNameField, EmailField, PasswordField} from '../Functions/Validation';

import { Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Login extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                failed: false,
            }
            this.onSubmit = this.onSubmit.bind(this);
            console.log(props);
        }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log(e.target.elements.Username.value);
        if((UserNameField(e.target.elements.Username.value) || EmailField(e.target.elements.Username.value)) && PasswordField(e.target.elements.Password.value)){
            document.body.classList.add('busy-cursor');
            const signupRequestObject = {
                usernameOrEmail: e.target.elements.Username.value,
                password: e.target.elements.Password.value
            }; 
            signin(signupRequestObject).then(response => {       
                console.log(response);       
                this.props.dispatch(LoadingChange({clicked: false}));
                if(response.tokenType === "Bearer "){
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.handleLogOn();
                }
                else{   
                    this.setState({ failed: true })
                    document.getElementById('Username').value = ''
                    document.getElementById('Password').value = ''
                }
            });
        }
        else{
            console.log("no");
        }
        //this.props.toggle();
    }

    render= () =>(
        <Form  onSubmit={this.onSubmit}>
            <FormGroup row>
            <Label for="Username" sm={2}>Username</Label>
                <Col sm={10}>
                    <Input type="text" name="Username" id="Username" placeholder="Username or Email" invalid={false} disabled={this.props.Loading.clicked} invalid={this.state.failed} />
                </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="Password" sm={2}>Password</Label>
                <Col sm={10}>
                    <Input type="password" name="Password" id="Password" placeholder="Password" disabled={this.props.Loading.clicked}  invalid={this.state.failed}  />
                </Col>
            </FormGroup>
            <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary" disabled={this.props.Loading.clicked}>Submit</Button>
                </Col>
          </FormGroup>
        </Form>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user,
        Loading: state.loading
    }
}

export default connect(MapUserInfo)(Login);