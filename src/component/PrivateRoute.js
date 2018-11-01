import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import MainContrainer from './MainContainer';

const PrivateRoute = ({component: Component, ...rest}) =>{
    return(
      <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
          ?  <MainContrainer component ={Component} {...props}/>
          : <Redirect to='/' />
      )} />
    )
  };


export default connect()(PrivateRoute);