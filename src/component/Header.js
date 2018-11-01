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
    min-width: 1100px;
    width:100%;
    min-height: 50px;
`

const HeaderLink = styled(Link)`
    color: black;
    text-decoration: none;
    font-family: Georgia;
    font-size: 40px;
    text-align: left ;
    position: absolute;
    bottom: 5px;
    left: 50px;
    vertical-align: middle;
`

const HeaderH1 = styled.h1`
`


const LogOutTextDiv = styled.div`
    display: inline-block;
    text-align: bottom;
    color: black;
    font-size: 30px;
    padding: 0;
    margin: 0;
    padding-right: 10px;
`

const LogOutButton = styled.button`
    background: #4a8aba;
    border: none;
    padding: 2px;
    width:75;
    border-radius: 3px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
`

const LogOutButtonDiv = styled.div`
    display: inline-block;
    margin-top: 5px;
    height: 100%;
`
const LogInDiv = styled.div`
    position: absolute;
    right: 25px; bottom: 0;
    text-align: right ;
`

const LogedInDiv = styled.div`
    position: absolute;
    display: block;
    right: 25px; bottom: 0;
    text-align: right ;
`


const Header =(props)=>{
    return(
    <MainHeader>
        <HeaderH1>
        <HeaderLink to="/">
            Expense Manager
        </HeaderLink>
        </HeaderH1>
    {(props.User.isAuthenticated) ?
            <LogedInDiv>
                <table>
                    <tbody>
                        <tr>
                            <td><LogOutTextDiv>Hello, {props.User.currentUser.name}</LogOutTextDiv></td>
                            <td><LogOutButtonDiv><LogOutButton onClick = {props.handleLogOut}>LogOut</LogOutButton></LogOutButtonDiv></td>
                        </tr>
                    </tbody>
                </table>
            </LogedInDiv> :
            <LogInDiv><Login handleLogOn={props.handleLogOn}/></LogInDiv>}
    </MainHeader>   
    );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(Header);