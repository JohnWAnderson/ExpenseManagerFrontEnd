
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';

const PageInfoMainDiv = styled.div`
    font-size: 25px;
    position: reletive;
    min-width: 700px;
    padding: 0;
    margin: 0;
    background: #D0D1D1;
`

const PageInfoDiv = styled.div`
    padding: 10px;
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



const getVisableItemNumber = (props) =>{
    return(
        <PageInfoMainDiv>
                {props.Items.length > 0 ? 
                <PageInfoDiv>Page contains {props.Items.length} which totals to: ${props.Sum/100}</PageInfoDiv>:
                <PageInfoDiv>Page contains no items</PageInfoDiv>}
            <PageInfoH1>
                <PageInfoLink to="/add" activeclassname="is-active" exact="true" > Add Item </PageInfoLink> 
            </PageInfoH1>
        </PageInfoMainDiv>
    );
}

const MapInfo=(state)=>{
    const currentItems = getVisableItem(state.items, state.filter)
    return{
        Sum: getSelectorSum(currentItems),
        Items: currentItems,
        sort: state.filter
    }
}

export default connect(MapInfo)(getVisableItemNumber);
