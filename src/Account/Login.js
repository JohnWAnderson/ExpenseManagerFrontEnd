import React from 'react';
import { signin, ACCESS_TOKEN } from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {UserNameField, EmailField, PasswordField} from '../Functions/Validation';

class Login extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                failed: false,
            }
        }

    render= () =>(
        <div>
            <form id="login-form" onSubmit={(e)=>{
                e.preventDefault();
                this.props.dispatch(LoadingChange({clicked: true}));
                if((UserNameField(e.target.elements.username.value) || EmailField(e.target.elements.username.value)) && PasswordField(e.target.elements.password.value)){
                    document.body.classList.add('busy-cursor');
                    const signupRequestObject = {
                        usernameOrEmail: e.target.elements.username.value,
                        password: e.target.elements.password.value
                    }; 
                    signin(signupRequestObject)
                    .then(response => {              
                        this.props.dispatch(LoadingChange({clicked: false}));
                        if(response.tokenType === "Bearer "){
                            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                            this.props.handleLogOn();
                        }
                        else{   
                            this.setState({ failed: true })
                            document.getElementById("login-form").reset();
                        }
                    });}
                else{
                    this.props.dispatch(LoadingChange({clicked: false}));
                    this.setState({ failed: true })
                    document.getElementById("login-form").reset();
                }
            
            }} >
                <table>
                <tbody>
                    <tr>
                        <td><label >Username or Email</label></td>
                        <td><label >Password</label></td>
                    </tr>
                    <tr>
                        <td><input failed={this.state.failed} disabled={this.props.Loading.clicked} type = "text" name = "username"  required/></td>
                        <td><input failed={this.state.failed} disabled={this.props.Loading.clicked} type = "password" name = "password"  required/></td>
                        <td><button type="submit" value="Submit" clicked={this.props.Loading.clicked} disabled={this.props.Loading.clicked} className= "LogButton" >Login Submit</button></td>
                    </tr>
                </tbody>
                </table>
            </form>
        </div>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user,
        Loading: state.loading
    }
}

export default connect(MapUserInfo)(Login);