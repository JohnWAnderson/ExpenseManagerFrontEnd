import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

const NoItems =(props)=>{
    {console.log(props)
    }
    return(
        <div>
            <h3>There are no items in Date Range {moment(props.filter.startDate).format("MM-DD-YYYY")} - {moment(props.filter.endDate).format("MM-DD-YYYY")}</h3>
        </div>
    )
}

const MapInfo=(state)=>{
    return{
        filter: state.filter
    }
}

export default connect(MapInfo)(NoItems);
