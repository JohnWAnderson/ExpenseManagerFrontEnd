
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';


const PageInfoDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
    font-size: 25px;
    position: reletive;
    min-width: 700px;
`

export default (props) =>{
    console.log(props)
    return(
        <PageInfoDiv>
            {props.items > 0 ? 
            <p>This Month contains {props.items} items which totals to: ${props.cost/100}</p>:
            <p>Page contains no items</p>}
        </PageInfoDiv>
    );
}
