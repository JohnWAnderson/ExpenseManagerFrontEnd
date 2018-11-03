import React from 'react';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateHomePageRoute = ({componentAuth: ComponentAuth, component: Component, ...rest}) =>{
    return(
      <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
          ?  <ComponentAuth  {...props}/>
          : <Component {...props}/>
      )} />
    )
  };


export default connect()(PrivateHomePageRoute);