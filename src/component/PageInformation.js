
import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';

const getVisableItemNumber = (props) =>{
    return(
        <div>
                {props.Items.length > 0 ? 
                <div>Page contains {props.Items.length} which totals to: ${props.Sum/100}</div>:
                <div>Page contains no items</div>}
        </div>
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
