import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';
import NoItems from './NoItems';
import ItemListHeader from './ItemListHeader';
import { Container, Row, Col } from 'reactstrap';
const ItemList =(props)=>{
    return(
        <Container>
            <ItemListHeader/>
                {props.itemsV.length > 0 ? 
                    props.itemsV.map((item,index)=>{
                    return(<Item key={index} {...item} index={props.items.indexOf(item)+1}/>)})
                    : 
                    <NoItems/>
                }
        </Container>
        
    );
}

const MapInfo=(state)=>{
    return{
        
        itemsV: getVisableItem(state.items, state.filter),
        items: state.items
    }
}

export default connect(MapInfo)(ItemList);
