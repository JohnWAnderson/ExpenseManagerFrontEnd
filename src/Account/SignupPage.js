import React from 'react';
import styled from 'styled-components';
import SignUp from './Signup';

const SignupPage =()=>{
    return(
        <div>
            <div>
                <h1>Track your spending habits now</h1>
                <h1>-Track Expenses with single payment or with recurring costs</h1>
                <h1>-Observe your spending habits relative to a time series</h1>
                <div>
                <h1>prototype information:</h1>
                <p>-! Calendar currently being worked on to be added into the home dash board !-</p>
                <p>-First start might take a some time, heroku api might have to wake up</p>
                <p>-CSS and UI currently being worked on, this is prototype build</p>
                <p>-Other components currently under built, only time series active</p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;