import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';
import NoItems from './NoItems';
import ItemListHeader from './ItemListHeader';
import { Container, Row, Col } from 'reactstrap';
import Media from "react-media";

const BoarderDiv = styled.div`
    border: 1px solid black; 
`
const ItemList =(props)=>{
    return(
        <Container>    
            <Media query="(max-width: 1200px)">
            {matches =>
            matches ? (
                <div></div>
            ) : (
                <ItemListHeader/>
            )
            }
        </Media>
                {props.itemsV.length > 0 ? 
                    props.itemsV.map((item,index)=>{
                    return(<BoarderDiv><Item key={index} {...item} index={props.items.indexOf(item)+1}/></BoarderDiv>)})
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
