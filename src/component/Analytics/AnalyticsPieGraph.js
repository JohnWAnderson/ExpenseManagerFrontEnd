import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col } from 'reactstrap';
import {Pie} from 'react-chartjs-2';
import getVisableItem from '../../Redux/SelectorItemOrder';
import GroupCalcuations from '../../Redux/GroupCalculation';
import { connect } from 'react-redux';
import MakeData from './MakeDataFunction';

const AnalyticsPieGraph =(props)=>{
    console.log(props.data);
    return(
        <Container>
            <Row>
                <Col>
                    <Pie data={props.data}/>
                </Col>
            </Row>
        </Container>  
    );
}

const MapInfo=(state)=>{
    return{
        data: MakeData(GroupCalcuations(state.items, {name:'', sortby:'cost', startDate:state.qFilter.StartDate , endDate: state.qFilter.EndDate}))
    }
}

export default connect(MapInfo)(AnalyticsPieGraph);
