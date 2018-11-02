import React from 'react';
import { signup, signin , UsernameAvailabile, EmailAvailabile, ACCESS_TOKEN, getCurrentUser} from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { addUser} from '../Redux/Actions/Users';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {UserNameField, EmailField, PasswordField, UserField} from '../Functions/Validation';

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
                                            this.resetInput(e);
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
                                            failed: true
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
                            failed: true
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

    resetInput = (e) =>{
        this.setState({name: {
            value: '',
            valid: false,
            error: ''
        },
        username: {
            value: '',
            valid: false,
            error: '',
            failed: false
        },
        email: {
            value: '',
            valid: false,
            error: '',
            failed: false
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
                    console.log(password,  this.state.rePassword.value);
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
        <div>
            <h1>Sign Up</h1>
            <div>
                <form  onSubmit= {this.onSubmit}>
                    <table>
                    <tbody>
                    <tr>
                        <td><input disabled={this.props.Loading.clicked} type = "text" name = "Name"  id="name" placeholder="Name" onChange = {this.NameChange} required /> </td>
                        <td>{!this.state.name.valid && this.state.name.error}</td>
                    </tr>
                    <tr>
                        <td><input disabled={this.props.Loading.clicked} failed={this.state.username.failed} type = "text" name = "Username" id="username" placeholder="Username" onChange = {this.UserNameChange} required /></td>
                        <td>{!this.state.username.valid && this.state.username.error}</td>
                    </tr>
                    <tr>
                        <td><input disabled={this.props.Loading.clicked} failed={this.state.email.failed} type = "email" name = "Email" id= "email" placeholder="Email"  onChange = {this.EmailChange} required/></td>
                        <td>{!this.state.email.valid && this.state.email.error}</td>
                    </tr>
                    <tr>
                        <td><input disabled={this.props.Loading.clicked} type = "password" name = "Password" id="password" placeholder="Password" onChange = {this.PasswordChange} required/></td>
                        <td>{!this.state.password.valid && this.state.password.error}</td>
                    </tr>
                    <tr>
                        <td><input disabled={this.props.Loading.clicked} type = "password" name = "rePassword" id="rePassword" placeholder="Re-Password" onChange = {this.RePasswordChange} required/></td>
                        <td>{!this.state.rePassword.valid && this.state.rePassword.error}</td>
                    </tr>
                    <tr>
                        <label><button type="submit" value="Submit" clicked={this.props.Loading.clicked} disabled={this.props.Loading.clicked} className= "button">Signup</button></label>
                    </tr>
                    </tbody>
                    </table>
                </form>
            </div>
        </div>
    );

}

const Signintable = styled.table`
    margin-left: 50px;
    position: relative;
    height: 100%; width: 450px;
`   

const MapUserInfo=(state)=>{
    return{
        User: state,
        Loading: state.loading
    }
}

export default connect(MapUserInfo)(Signup);