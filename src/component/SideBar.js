import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const SideBar = ({component: Component, ...rest}) =>{
    return(
        <div>
            <h1>Menu</h1>
            <Link to="/" activeclassname="is-active" exact="true" >Home</Link> 
            <Link to="/calendar" activeclassname="is-active" exact="true" >Calendar</Link>
            <Link to="/add" activeclassname="is-active" exact="true" >Add Item</Link>
        </div>
    )
  };


export default connect()(SideBar);