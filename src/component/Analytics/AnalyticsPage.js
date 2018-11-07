import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import Media from "react-media";
import {Doughnut} from 'react-chartjs-2';
import getVisableItem from '../../Redux/SelectorItemOrder';

class AnalyticsPage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <Container>

            </Container>
        )
    }
}

const MapInfo=(state)=>{
    return{       
        //itemsV: getVisableItem(state.items, {'','cost', qFilter.}),
        items: state.items
    }
}

export default connect(MapInfo)(AnalyticsPage);
