import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SideBar from './SideBar';

const MainDiv = styled.div`
    border-collapse: collapse;
    position: relative;
    display: table;
    height: 92%;
    min-height: 92%;
    margin: 0;
    padding: 0;
    border: 0;
    width:100%;
    min-width: 1100px;
`

const SideBarDiv = styled.div`
    Background: #f1f1f1;
    vertical-align: top;
    display: table-cell;
    position: relative;
    width: 10%;
    height: 100%;
    min-width: 150px;
    margin: 0;
    padding: 0;
    border: 0;
`

const ComponentDiv = styled.div`
    vertical-align: top;
    display: table-cell;
    position: relative;
    width: 90%;
    height: 100%;
    min-width: 950px;
`


const MainContrainer = ({component: Component, ...props} ) =>{
    return(
        <MainDiv>
            <SideBarDiv><SideBar/></SideBarDiv>
            <ComponentDiv><Component {...props}/></ComponentDiv>
        </MainDiv>
    )
  };


export default connect()(MainContrainer);