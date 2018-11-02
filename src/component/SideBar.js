import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const MainSigninDiv = styled.div`
    text-align: center;
    height: 100%;
    width: 100%;
    min-width: 150px;
    padding: 0;
    margin: 0;
    border-right: 1px solid black;
`   

const MenuTitleH1 = styled.h1`
    text-align: center;
    font-size: 25px;
    padding: 10px;
    margin: auto;
    background: dimgrey;
    color: white;
    border-bottom: 1px solid black;
`

const SideBarLink = styled(Link)`
    text-decoration: none;
    display: block;
    text-decoration: none;
    position: reletive;
    font-size: 20px;
    padding: 15px;
    border:0;
    margin: 0;
    color: black; 
    border-bottom: 1px solid black;
    &:hover ${SideBarLink} {
        text-decoration: none;
        color: #a8a8a8;
    }
`

const SideBar = ({component: Component, ...rest}) =>{
    return(
        <MainSigninDiv>
            <MenuTitleH1>Menu</MenuTitleH1>
            <SideBarLink to="/" activeclassname="is-active" exact="true" >Home</SideBarLink> 
            <SideBarLink to="/calendar" activeclassname="is-active" exact="true" >Calendar</SideBarLink>
            <SideBarLink to="/add" activeclassname="is-active" exact="true" >Add Item</SideBarLink>
        </MainSigninDiv>
    )
  };


export default connect()(SideBar);