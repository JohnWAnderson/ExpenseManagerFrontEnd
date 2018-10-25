
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';

const HeaderLink = styled(Link)`
    color: green;
    text-decoration: none;
    font-family: Georgia;
    text-align: left ;
    position: reletive;
`
const HeaderH1 = styled.h1`
    font-size: 25px;
    margin-bottom: 10px;
    margin-top: 10px;
    position: reletive;
`

const HeaderDiv = styled.div`
    font-size: 25px;
    position: reletive;
`

const getVisableItemNumber = (props) =>{
    return(
        <HeaderDiv>
            <div>
                {props.Items.length > 0 ? 
                <p>Page contains {props.Items.length} which totals to: ${props.Sum/100}</p>:
                <p>Page contains no items</p>}
            </div>
            <HeaderH1>
                <HeaderLink to="/add" activeclassname="is-active" exact="true" > Add Item </HeaderLink> 
            </HeaderH1>
        </HeaderDiv>
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
