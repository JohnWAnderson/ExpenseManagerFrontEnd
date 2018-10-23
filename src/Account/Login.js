import React from 'react';
import { signin, ACCESS_TOKEN } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import styled from 'styled-components';

const LoginInput = styled.input`
margin: 2px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
`
const LoginLabelTd = styled.td`
text-align: center ;
`

const LoginButton = styled.button`
background: #4a8aba;
border: none;
padding: 2px 2px;
border-radius: 3px;
text-align: center;
text-decoration: none;
display: inline-block;
`

const Login =(props)=> {
    console.log(props);
    
    return(
        <div>
            <form id="login-form" onSubmit={(e)=>{
                e.preventDefault();
                const signupRequestObject = {
                    usernameOrEmail: e.target.elements.username.value,
                    password: e.target.elements.password.value
                };
                signin(signupRequestObject)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    props.handleLogOn();
                });
                document.getElementById("login-form").reset();
            }} >
                <table>
                <tbody>
                    <tr>
                        <LoginLabelTd><label >Username or Email</label></LoginLabelTd>
                        <LoginLabelTd><label >Password</label></LoginLabelTd>
                    </tr>
                    <tr>
                        <td><LoginInput type = "text" name = "username" onChange = {this.UserNameChange} required/></td>
                        <td><LoginInput type = "password" name = "password" onChange = {this.PasswordChange} required/></td>
                        <td><LoginButton className= "button">Login Submit</LoginButton></td>
                    </tr>
                </tbody>
                </table>
            </form>
        </div>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(Login);