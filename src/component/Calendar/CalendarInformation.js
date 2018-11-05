
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';

const PageInfoRow = styled(Row)`
    color: black;
    text-decoration: none;
    font-family: Georgia;
    font-size: 20px;
    position: relative;
    vertical-align: middle;
    text-align:center;
`

export default (props) =>{
    return(
        <Container>
        {props.items > 0 ? 
            <div><PageInfoRow><Col><h1>Month contains {props.items} items</h1></Col></PageInfoRow> <PageInfoRow><Col><h1>Totaling ${props.cost/100}</h1></Col></PageInfoRow></div>:
            <PageInfoRow>Page contains no items</PageInfoRow>}
        </Container>
    );
}
