import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
const NoItems =(props)=>{
    return(
        <div>
            <Row>
                <Col>There are no items in Date Range {moment(props.filter.startDate).format("MM-DD-YYYY")} - {moment(props.filter.endDate).format("MM-DD-YYYY")}</Col>
            </Row>
        </div>
    )
}

const MapInfo=(state)=>{
    return{
        filter: state.filter
    }
}

export default connect(MapInfo)(NoItems);
