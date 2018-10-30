
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
    background: #D0D1D1;
`
const PageInfoLink = styled(Link)`
    color: green;
    text-decoration: none;
    font-family: Georgia;
    text-align: left ;
    position: reletive;
`
const PageInfoH1 = styled.h1`
    font-size: 25px;
    margin: auto;
    margin-bottom: 10px;
    margin-top: 10px;
    position: reletive;
`
const PageInfoDiv = styled.div`
    padding: 10px;
`

export default (props) =>{
    console.log(props)
    return(
        <CalInfoMainDiv>
            {props.items > 0 ? 
            <PageInfoDiv>This Month contains {props.items} items which totals to: ${(props.cost/100).toFixed(2)}</PageInfoDiv>:
            <PageInfoDiv>Page contains no items</PageInfoDiv>}
            <PageInfoH1>
                <PageInfoLink to="/add" activeclassname="is-active" exact="true" > Add Item </PageInfoLink> 
            </PageInfoH1>
        </CalInfoMainDiv>
    );
}
