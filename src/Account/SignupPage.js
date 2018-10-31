import React from 'react';
import styled from 'styled-components';
import SignUp from './Signup';

const SignUpInfoH1 = styled.h1`
text-align: left;
padding-bottom: 25px;
`

const InformationH1 = styled.h1`
    text-align: left ;
    padding-bottom: 25px;
    padding-left: 2px;
    font-size: 16px;
`

const PrototypeH1 = styled.h1`
    text-align: left ;
    padding-bottom: 20px;
    padding-left: 2px;
`
const InformationBottomDiv = styled.div`
    text-align: left ;
    position: relitive; 
    bottom: 0;
    margin-top: 200px;
    border: 1px solid black;
`

const MainSigninDiv = styled.div`
    position: relative;
    display: block;
    text-align: center;
    height: 100%;
    min-width: 1000px;
    width: 100%;
    background: #F7F7F7;
    padding-bottom: 50px;
    padding-top: 25px;
`   

const MaSigninInfoDiv = styled.div`
    display: inline-block;
    min-width: 400px;
    vertical-align: top;
    align: left;
    width: 500px;
    height: 100%;
    text-align: left ;
    position=relative;
`   

const SignupPage =()=>{
    return(
        <MainSigninDiv>
        <MaSigninInfoDiv>
        <SignUpInfoH1>Track your spending habits now</SignUpInfoH1>
        <InformationH1>-Track Expenses with single payment or with recurring costs</InformationH1>
        <InformationH1>-Observe your spending habits relative to a time series</InformationH1>
        <InformationBottomDiv>
        <PrototypeH1>prototype information:</PrototypeH1>
        <p>-! Calendar currently being worked on to be added into the home dash board !-</p>
        <p>-First start might take a some time, heroku api might have to wake up</p>
        <p>-CSS and UI currently being worked on, this is prototype build</p>
        <p>-Other components currently under built, only time series active</p>
        </InformationBottomDiv>
        </MaSigninInfoDiv>
        <SignUp/>
        </MainSigninDiv>
    );
}

export default SignupPage;