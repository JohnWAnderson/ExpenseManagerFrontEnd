import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const MainSigninDiv = styled.div`
    text-align: center;
    height: 100%;
    width: 100%;
    min-width: 150px;
    width: 100%;
    padding: 0;
    margin: 0;
`   

const MenuTitleH1 = styled.h1`
    text-align: center;
    font-size: 25px;
    padding: auto;
    margin: auto;
`

const SideBar = ({component: Component, ...rest}) =>{
    return(
        <MainSigninDiv>
            <MenuTitleH1>Menu</MenuTitleH1>
        </MainSigninDiv>
    )
  };


export default connect()(SideBar);