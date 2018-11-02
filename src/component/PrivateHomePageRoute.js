import React from 'react';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateHomePageRoute = ({componentAuth: componentAuth, component: Component, ...rest}) =>{
    return(
      <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
          ?  <componentAuth  {...props}/>
          : <Component {...props}/>
      )} />
    )
  };


export default connect()(PrivateHomePageRoute);