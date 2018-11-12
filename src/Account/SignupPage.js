import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';

const ProptypeInfo = styled.div`
    border: 3px solid black;
    width:60%;
    bottom: 0;
    text-align: left ;
    position: relitive; 
    bottom: 0;
    margin-top: 200px;
`

const MainContainer = styled(Container)`
    height:92;
`

const SignupPage =()=>{
    return(
        <MainContainer>
            <Row><Col><h1>Track your spending habits now</h1></Col></Row>
            <Row><Col><h3>-Track Expenses with single payment or with recurring costs</h3></Col></Row>
            <Row><Col><h3>-Observe your spending habits</h3></Col></Row>
                <ProptypeInfo>
                    <h1>prototype information:</h1>
                    <p>-! Calendar currently being worked on to be added into the home dash board !-</p>
                    <p>-! Analytics currently being worked on to be added into the home dash board !-</p>
                    <p>-! First start might take a some time, heroku api might have to wake up !-</p>
                    <p>-! CSS and UI currently being worked on, this is prototype build !-</p>
                </ProptypeInfo>
        </MainContainer>
    );
}

export default SignupPage;