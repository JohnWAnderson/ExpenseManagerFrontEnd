import React from 'react';
import { signin, ACCESS_TOKEN } from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {UserNameField, EmailField, PasswordField} from '../Functions/Validation';

const LoginInput = styled.input`
margin: 2px 0;
display: inline-block;
border: 2px solid #ccc;
border-radius: 5px;
box-sizing: border-box;

${({ failed }) => failed && `
border-color: red;
`}

`
const LoginLabelTd = styled.td`
text-align: center ;
`

const LoginButton = styled.button`
background-color: #4a8aba;
border: none;
padding: 2px 2px;
border-radius: 3px;
text-align: center;
text-decoration: none;
display: inline-block;

${({ clicked }) => clicked && `
background-color: white;
`}
`


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
                        <LoginLabelTd><label >Username or Email</label></LoginLabelTd>
                        <LoginLabelTd><label >Password</label></LoginLabelTd>
                    </tr>
                    <tr>
                        <td><LoginInput failed={this.state.failed} disabled={this.props.Loading.clicked} type = "text" name = "username"  required/></td>
                        <td><LoginInput failed={this.state.failed} disabled={this.props.Loading.clicked} type = "password" name = "password"  required/></td>
                        <td><LoginButton type="submit" value="Submit" clicked={this.props.Loading.clicked} disabled={this.props.Loading.clicked} className= "LogButton" >Login Submit</LoginButton></td>
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