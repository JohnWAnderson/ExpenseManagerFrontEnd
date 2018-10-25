import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Login from '../Account/Login';
const MainHeader = styled.header`
    padding: 0;
    height: 8%;
    background: #5dade9
    position: relative;
    min-width: 750px;
`

const HeaderLink = styled(Link)`
    color: #383951;
    text-decoration: none;
    font-family: Georgia;
    text-align: left ;
    position: absolute;
    bottom: 0;
`

const HeaderH1 = styled.h1`
    left: 0; bottom: 0
    font-size: 40px;
`

const LogOutTextDiv = styled.div`
    font-size: 30px;
    padding-right: 10px;
    display: inline-block;
`

const LogOutDiv = styled.div`
    position: absolute;
    right: 0; bottom: 0
    text-align: right ;
`

const LogOutButton = styled.button`
background: #4a8aba;
border: none;
padding: 2px 2px;
border-radius: 3px;
text-align: center;
text-decoration: none;
display: inline-block;
`

const LogInDiv = styled.div`
    position: absolute;
    right: 0; bottom: 0;
    text-align: right ;
`

const ErrorHeaderServer = styled.div`
    text-align: center ;
    color: red;
    font-size: 30px;
`

const Header =(props)=>{
    return(
    <MainHeader>
        <HeaderH1>
        <HeaderLink to="/">
            Expense Manager
        </HeaderLink>
        </HeaderH1>
    {props.Loading.serverFail && <ErrorHeaderServer>Server is down try again later</ErrorHeaderServer>}
    {(props.User.isAuthenticated) ?
            <LogOutDiv>
            <LogOutTextDiv>Hello, {props.User.currentUser.name}</LogOutTextDiv>
            <LogOutButton onClick = {props.handleLogOut}>LogOut</LogOutButton>
            </LogOutDiv> :
            <LogInDiv><Login handleLogOn={props.handleLogOn}/></LogInDiv>}
    </MainHeader>   
    );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user,
        Loading: state.loading
    }
}

export default connect(MapUserInfo)(Header);