
import React from 'react';
import { connect } from 'react-redux';
import getSelectorSum from '../../Redux/SelectorSum';
import getVisableItem from '../../Redux/SelectorItemOrder';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';


const PageInfoRow = styled(Row)`
    color: black;
    text-decoration: none;
    font-family: Georgia;
    font-size: 20px;
    position: relative;
    vertical-align: middle;
    text-align:center;
`

const getVisableItemNumber = (props) =>{
    return(
        <Container>
            {props.Items.length > 0 ? <div>
            <PageInfoRow><Col><h1>Page contains {props.Items.length} Items</h1></Col></PageInfoRow> <PageInfoRow><Col><h1>Totaling ${(props.Sum/100).toFixed(2)}</h1></Col></PageInfoRow></div>:
            <PageInfoRow>Page contains no items</PageInfoRow>}
        </Container>
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
