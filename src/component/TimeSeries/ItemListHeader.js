import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const NormalCol = styled(Col)`
    word-wrap: break-word;
    text-align:center;
    font-size: 30px;
`

const BottomBoarderDiv = styled.div`
    border-bottom: 3px solid black;
`

export default ()=>{
    return(
    <BottomBoarderDiv>
        <Row>
            <NormalCol>Name</NormalCol>
            <NormalCol></NormalCol>
            <NormalCol>Cost</NormalCol>
        </Row>
    </BottomBoarderDiv>
    );
}