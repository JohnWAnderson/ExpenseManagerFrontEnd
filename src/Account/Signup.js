import React from 'react';
import { signup, signin , UsernameAvailabile, EmailAvailabile, ACCESS_TOKEN, getCurrentUser} from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { addUser} from '../Redux/Actions/Users';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {UserNameField, EmailField, PasswordField, UserField} from '../Functions/Validation';
import { Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: '',
                valid: false,
                error: ''
            },
            username: {
                value: '',
                valid: false,
                error: ''
            },
            email: {
                value: '',
                valid: false,
                error: ''
            },
            password: {
                value: '',
                valid: false,
                error: ''
            },
            rePassword: {
                value: '',
                valid: false,
                error: ''
            }
        }
        this.resetInput = this.resetInput.bind(this);
        this.signedup = this.signedup.bind(this);
    }  

    onSubmit = (e) =>{
        e.preventDefault();
        
        this.props.dispatch(LoadingChange({clicked: true}));
          if(this.state.username.valid && this.state.name.valid && this.state.email.valid && this.state.password.valid && this.state.rePassword.valid){
            const signupRequestObject = {
                name: this.state.name.value,
                email: this.state.email.value,
                username: this.state.username.value,
                password: this.state.password.value
            };
            UsernameAvailabile(this.state.username.value).then(response =>
                {
                    if(response.available){
                        EmailAvailabile(this.state.email.value).then(response =>
                            {
                                if(response.available){
                                    signup(signupRequestObject).then(response => {
                                        if(response.available){
                                            this.signedup(signupRequestObject.username, signupRequestObject.password);
                                            this.resetInput();
                                        }
                                        else{
                                            this.props.dispatch(LoadingChange({clicked: false}));
                                        }
                                    });
                                }
                                else{
                                    this.props.dispatch(LoadingChange({clicked: false}));
                                    this.setState({
                                        email: {
                                            value: this.state.email.value,
                                            valid: false,
                                            error: 'email taken',
                                        }
                                    })
                                }
                            });      
                    }
                    else{
                        this.props.dispatch(LoadingChange({clicked: false}));       
                this.setState({
                        username: {
                            value: this.state.username.value,
                            valid: false,
                            error: 'username taken',
                        }
                })
                }
            });
        }
        else{
            this.props.dispatch(LoadingChange({clicked: false}));
        }
    };

    signedup=(username, password)=>{
        const signinRequestObject = {
            usernameOrEmail: username,
            password: password
        };
        signin(signinRequestObject)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            getCurrentUser()
            .then(response => {
                this.props.dispatch(LoadingChange({clicked: false}));
                this.props.dispatch(addUser({currentUser: response, isAuthenticated: true}))
            })
        });
    }

    resetInput = () =>{
        this.setState({name: {
            value: '',
            valid: false,
            error: ''
        },
        username: {
            value: '',
            valid: false,
            error: '',
        },
        email: {
            value: '',
            valid: false,
            error: '',
        },
        password: {
            value: '',
            valid: false,
            error: ''
        }})
    };

        PasswordChange = (e) =>{         
            const password = e.target.value
            if(password.length >= 6 && password.length <= 20){
                if(PasswordField(password)){
                this.setState({
                    password: {
                        value: password,
                        valid: true,
                        error: ''
                    }})
                    if(password === this.state.rePassword.value){
                        this.setState({
                            rePassword: {
                                value: this.state.rePassword.value,
                                valid: true,
                                error: ''
                        }})}
                    else{
                        this.setState({
                            rePassword: {
                                value: this.state.rePassword.value,
                                valid: false,
                                error: "Don't Match"
                        }})
                    }
                }
                else{
                    this.setState({
                        password: {
                            value: password,
                            valid: false,
                            error: 'Invalid Character'
                        }})
                }
            }
            else if(password.length === 0){
                this.setState({
                    password: {
                        value: password,
                        valid: false,
                        error: ''
                    }})
            }
            else{
                this.setState({
                    password: {
                        value: password,
                        valid: false,
                        error: 'Invalid Length'
                    }})
            }
        }

        RePasswordChange = (e) =>{         
            const rePassword = e.target.value
            if(rePassword.length >= 6 && rePassword.length <= 20){
                if(rePassword === this.state.password.value){
                this.setState({
                    rePassword: {
                        value: rePassword,
                        valid: true,
                        error: ''
                    }})}
                else{
                    this.setState({
                        rePassword: {
                        value: rePassword,
                        valid: false,
                        error: "Don't Match"
                    }})
                }
            }
            else{
                this.setState({
                    rePassword: {
                        value: rePassword,
                        valid: false,
                        error: "Don't Match"
                    }})
            }
        }
    
        NameChange = (e) =>{
            const name = e.target.value
            if(name.length >= 3 && name.length <= 40){
                if(UserField(name)){
                    this.setState({
                        name: {
                            value: name,
                            valid: true,
                            error: ''
                        }
                    })}
                else{
                    this.setState({
                        name: {
                            value: name,
                            valid: false,
                            error: 'Invalid Character'
                        }
                    }) 
                }
            }
            else if(name.length === 0){
                this.setState({
                    name: {
                        value: name,
                        valid: false,
                        error: ''
                    }})
            }
            else{
                this.setState({
                    name: {
                        value: name,
                        valid: false,
                        error: "Invalid Length"
                    }
                })  
            }
        }
    
        UserNameChange = (e) =>{
            const UserName = e.target.value
            if(UserName.length >= 3 && UserName.length <= 20){
                if(UserNameField(UserName)){
                    this.setState({
                        username: {
                            value: UserName,
                            valid: true,
                            error: ''
                        }
                    })}
                else{
                    this.setState({
                        username: {
                            value: UserName,
                            valid: false,
                            error: 'Invalid Character'
                        }
                    })
                }
            }
            else if(UserName.length === 0){
                this.setState({
                    username: {
                        value: UserName,
                        valid: false,
                        error: ''
                    }
                })
            }
            else{
                this.setState({
                    username: {
                        value: UserName,
                        valid: false,
                        error: 'Invalid Length'
                    }
            })
            }
        }
    
        EmailChange = (e) =>{
            const email = e.target.value
            if(email.length=== 0){
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: ''
                    }
                })
            }
            else if(EmailField(email)){
                if(email.length <= 50){
                                this.setState({
                                    email: {
                                        value: email,
                                        valid: true,
                                        error: ''
                                    }
                                })
            }
            else{
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: 'Email To Long'
                    }
                })
            }
        }else{
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: 'Invalid Email'
                    }
                })
            }
        }
    render= () =>(
        <Form  onSubmit={this.onSubmit}>
            <FormGroup row>
            <Label for="name" sm={2}>Name</Label>
                <Col sm={10}>
                    <Input type="text" name="name" id="name" placeholder="Full Name" invalid={!this.state.name.valid && !!this.state.name.error}
                     disabled={this.props.Loading.clicked} onChange = {this.NameChange} required />
                     <FormFeedback>{this.state.name.error}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
                <Col sm={10}>
                    <Input type="text" name="Username" id="username" placeholder="Username" invalid={!this.state.username.valid && !!this.state.username.error}
                    disabled={this.props.Loading.clicked}  onChange = {this.UserNameChange} required />
                    <FormFeedback>{this.state.username.error}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
                <Col sm={10}>
                    <Input type="email" name="email" id="email" placeholder="Email" invalid={!this.state.email.valid && !!this.state.email.error}
                     disabled={this.props.Loading.clicked} onChange = {this.EmailChange} required/>
                     <FormFeedback>{this.state.email.error}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
                <Col sm={10}>
                    <Input type="password" name="password" id="password" placeholder="Password" invalid={!this.state.password.valid && !!this.state.password.error} 
                    disabled={this.props.Loading.clicked} onChange = {this.PasswordChange} required/>
                    <FormFeedback>{this.state.password.error}</FormFeedback>
                </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="rePassword" sm={2}>RePassword</Label>
                <Col sm={10}>
                    <Input type="password" name="rePassword" id="rePassword" placeholder="Re Password" invalid={!this.state.rePassword.valid && !!this.state.rePassword.error} 
                    disabled={this.props.Loading.clicked} onChange = {this.RePasswordChange} required/>
                    <FormFeedback>{this.state.rePassword.error}</FormFeedback>
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
        User: state,
        Loading: state.loading
    }
}

export default connect(MapUserInfo)(Signup);