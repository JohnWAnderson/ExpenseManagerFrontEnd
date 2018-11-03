import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const NormalCol = styled(Col)`
    word-wrap: break-word;
    text-align:center;
`

export default ()=>{
    return(
    <Row>
        <NormalCol>Name</NormalCol>
        <NormalCol>Note</NormalCol>
        <NormalCol>Cost</NormalCol>
    </Row>
    );
}