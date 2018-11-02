import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SideBar from './SideBar';


const MainContrainer = ({component: Component, ...props} ) =>{
    return(
        <div>
            <div><SideBar/></div>
            <div><Component {...props}/></div>
        </div>
    )
  };


export default connect()(MainContrainer);