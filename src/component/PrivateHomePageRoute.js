import React from 'react';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import MainContrainer from './MainContainer';

const PrivateHomePageRoute = ({componentAuth: componentAuth, component: Component, ...rest}) =>{
    return(
      <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
          ?  <MainContrainer component ={componentAuth} {...props}/>
          : <Component {...props}/>
      )} />
    )
  };


export default connect()(PrivateHomePageRoute);