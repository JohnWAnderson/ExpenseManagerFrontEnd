import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const NormalCol = styled(Col)`
    word-wrap: break-word;
    text-align:center;
`

const BottomBoarderDiv = styled.div`
    border-bottom: 3px solid black;
`

export default ()=>{
    return(
    <BottomBoarderDiv>
        <Row>
            <NormalCol>Name</NormalCol>
            <NormalCol>Note</NormalCol>
            <NormalCol>Cost</NormalCol>
        </Row>
    </BottomBoarderDiv>
    );
}