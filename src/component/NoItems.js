import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

const ItemDiv = styled.div`
    border: 1px solid black;
    position: relative;
    display: block;
    height: 100%;
`   
const ItemH3 = styled.h3`
    text-align:center;
    position: relative;
    font-size: 30px;
    margin: 0;
`   

const NoItems =(props)=>{
    {console.log(props)
    }
    return(
        <ItemDiv>
            <ItemH3>There are no items in Date Range {moment(props.filter.startDate).format("MM-DD-YYYY")} - {moment(props.filter.endDate).format("MM-DD-YYYY")}</ItemH3>
        </ItemDiv>
    )
}

const MapInfo=(state)=>{
    return{
        filter: state.filter
    }
}

export default connect(MapInfo)(NoItems);
