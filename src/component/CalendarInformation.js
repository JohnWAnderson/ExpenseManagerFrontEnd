
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const CalInfoMainDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
    font-size: 25px;
    position: reletive;
    min-width: 800px;
`
const PageInfoDiv = styled.div`
    padding: 10px;
`

export default (props) =>{
    return(
        <CalInfoMainDiv>
            {props.items > 0 ? 
            <PageInfoDiv>This month contains {props.items} items which totals to: ${(props.cost/100).toFixed(2)}</PageInfoDiv>:
            <PageInfoDiv>Page month no items</PageInfoDiv>}
        </CalInfoMainDiv>
    );
}
