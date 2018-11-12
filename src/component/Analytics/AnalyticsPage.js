import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import Media from "react-media";
import {Doughnut} from 'react-chartjs-2';
import getVisableItem from '../../Redux/SelectorItemOrder';
import moment from 'moment';
import AnalyticsPieGraph from './AnalyticsPieGraph';
import { editItem } from '../../Redux/Actions/Items';
import {TimesItemChange} from '../../Redux/TimesChange';
import GetFirstQuarter from '../../Redux/GetFirstQuarter';

class AnalyticsPage extends React.Component {
    constructor(props){
        super(props);
        this.TimesAmountChange= this.TimesAmountChange.bind(this);
        this.TimesAmountChange(props.qFilter.StartDate, props.qFilter.EndDate)
        GetFirstQuarter(props.items);
    }

    TimesAmountChange = (startDate, endDate) =>{
        this.props.items.map((item)=>{
            //console.log(item, startDate, endDate, TimesItemChange(item, startDate, endDate));
            this.props.dispatch(editItem(item.name, {qTimes: TimesItemChange(item, startDate, endDate)}));
        })
    };
    
    render() {      
        return(
            <Container>
                <Row>
                    <Col>Currently in {moment(this.props.qFilter.StartDate).quarter()}  quarter</Col>
                    <Col><AnalyticsPieGraph itemsV={this.props.itemsV} /></Col>
                </Row>
            </Container>
        )
    }
}

const MapInfo=(state)=>{
    return{       
        qFilter: state.qFilter,
        items: state.items
    }
}

export default connect(MapInfo)(AnalyticsPage);
