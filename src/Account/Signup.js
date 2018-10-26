import React from 'react';
import { signup, signin , UsernameAvailabile, EmailAvailabile, ACCESS_TOKEN, getCurrentUser} from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { addUser} from '../Redux/Actions/Users';
import styled from 'styled-components';
import { connect } from 'react-redux';

const SingUpH1 = styled.h1`
    text-align: left ;
    padding-bottom: 25px;
    padding-left: 2px;
`

const InformationH1 = styled.h1`
    text-align: left ;
    padding-bottom: 25px;
    padding-left: 2px;
    font-size: 16px;
`

const PrototypeH1 = styled.h1`
    text-align: left ;
    padding-bottom: 20px;
    padding-left: 2px;
`
const InformationBottomDiv = styled.div`
    text-align: left ;
    position: absolute; 
    bottom: 0;
    border: 1px solid black;
`

const SignUpInput = styled.input`
    margin-bottom: 10px;
    padding: 2px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    height: 35px;
    width: 300px;

    ${({ failed }) => failed && `
    border-color: red;
    `}

`
const SignupTdLabel = styled.td`
    position: relative;
    text-align: left ;
`
const SignupForm = styled.form`
`
const SignupFormDiv = styled.div`
    display: inline-block;
    width: 100%;
`

const SignupTdError = styled.td`
    text-align: right ;
    width: 100px; height: auto;
    color: red;
`
const SignupDiv = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 40%;
    align: right;
    text-align: right ;
    position: relative;
    height: 100%;
`   

const MainSigninDiv = styled.div`
    position: relative;
    display: block;
    height: 100%;
`   

const MaSigninInfoDiv = styled.div`
    display: inline-block;
    vertical-align: top;
    align: left;
    width: 60%;
    height: 100%;
    text-align: left ;
    position=relative;
`   
const LoginButton = styled.button`
    background-color: green;
    border: none;
    padding: 2px 2px;
    margin-left: 3px;
    font-size: 16px;
    border-radius: 3px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

    ${({ clicked }) => clicked && `
    background-color: lime;
    `}`


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
        this.validateEmail = this.validateEmail.bind(this);
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

        validateEmail =(email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        PasswordChange = (e) =>{         
            const password = e.target.value
            if(password.length >= 6 && password.length <= 20){
                this.setState({
                    password: {
                        value: password,
                        valid: true,
                        error: ''
                    }})
                if(password === this.state.rePassword.value){
                    this.setState({
                        rePassword: {
                            valid: true,
                    }})}
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
                        error: ''
                    }})
            }
        }
    
        NameChange = (e) =>{
            const name = e.target.value
            if(name.length >= 3 && name.length <= 40){
                this.setState({
                    name: {
                        value: name,
                        valid: true,
                        error: ''
                    }
                })
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
                            this.setState({
                                username: {
                                    value: UserName,
                                    valid: true,
                                    error: ''
                                }
                            })
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
            else if(this.validateEmail(email)){
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
                        error: 'email to long'
                    }
                })
            }
        }else{
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: 'invalid email'
                    }
                })
            }
        }
    render= () =>(
        <MainSigninDiv>
        <MaSigninInfoDiv>
        <SingUpH1>Track your spending habits now</SingUpH1>
        <InformationH1>-Track Expenses with single payment or with recurring costs</InformationH1>
        <InformationH1>-Observe your spending habits relative to a time series</InformationH1>
        <InformationBottomDiv>
        <PrototypeH1>prototype information:</PrototypeH1>
        <p>-! Calendar currently being worked on to be added into the home dash board !-</p>
        <p>-First start might take a some time, heroku api might have to wake up</p>
        <p>-CSS and UI currently being worked on, this is prototype build</p>
        <p>-Other components currently under built, only time series active</p>
        </InformationBottomDiv>
        </MaSigninInfoDiv>
        <SignupDiv>
            <SingUpH1>Sign Up</SingUpH1>
            <SignupFormDiv>
                <SignupForm  onSubmit= {this.onSubmit}>
                    <table>
                    <tbody>
                    <tr>
                        <td><SignUpInput disabled={this.props.Loading.clicked} type = "text" name = "Name"  id="name" placeholder="Name" onChange = {this.NameChange} required /> </td>
                        <SignupTdError>{!this.state.name.valid && this.state.name.error}</SignupTdError>
                    </tr>
                    <tr>
                        <td><SignUpInput disabled={this.props.Loading.clicked} failed={this.state.username.failed} type = "text" name = "Username" id="username" placeholder="Username" onChange = {this.UserNameChange} required /></td>
                        <SignupTdError>{!this.state.username.valid && this.state.username.error}</SignupTdError>
                    </tr>
                    <tr>
                        <td><SignUpInput disabled={this.props.Loading.clicked} failed={this.state.email.failed} type = "email" name = "Email" id= "email" placeholder="Email"  onChange = {this.EmailChange} required/></td>
                        <SignupTdError>{!this.state.email.valid && this.state.email.error}</SignupTdError>
                    </tr>
                    <tr>
                        <td><SignUpInput disabled={this.props.Loading.clicked} type = "password" name = "Password" id="password" placeholder="Password" onChange = {this.PasswordChange} required/></td>
                        <SignupTdError>{!this.state.password.valid && this.state.password.error}</SignupTdError>
                    </tr>
                    <tr>
                        <td><SignUpInput disabled={this.props.Loading.clicked} type = "password" name = "rePassword" id="rePassword" placeholder="Re-Password" onChange = {this.RePasswordChange} required/></td>
                        <SignupTdError>{!this.state.rePassword.valid && this.state.rePassword.error}</SignupTdError>
                    </tr>
                    <tr>
                        <SignupTdLabel><LoginButton type="submit" value="Submit" clicked={this.props.Loading.clicked} disabled={this.props.Loading.clicked} className= "button">Signup</LoginButton></SignupTdLabel>
                    </tr>
                    </tbody>
                    </table>
                </SignupForm>
            </SignupFormDiv>
        </SignupDiv>
        </MainSigninDiv>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state,
        Loading: state.loading
    }
}

export default connect(MapUserInfo)(Signup);