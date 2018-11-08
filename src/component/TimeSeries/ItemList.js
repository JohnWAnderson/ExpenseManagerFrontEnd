import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../../Redux/SelectorItemOrder';
import styled from 'styled-components';
import NoItems from './NoItems';
import ItemListHeader from './ItemListHeader';
import { Container, Row, Col } from 'reactstrap';
import Media from "react-media";

const BoarderDiv = styled.div`
    border-top: 3px solid black;
    border-right: 3px solid black;
    border-left: 3px solid black;
`

const BoarderCont = styled(Container)`
    border-top: 3px solid black;
    border-right: 3px solid black;
    border-left: 3px solid black;
`

const NoPadBoarderDiv = styled.div`
    border-top: 3px solid black;
    border-right: 3px solid black;
    border-left: 3px solid black;
`

const ItemList =(props)=>{
    console.log(props.all);
    
    return(
        <Container>    
            <NoPadBoarderDiv>
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
                        //console.log(item);
                        return(<Item key={index} {...item} index={props.items.indexOf(item)+1}/>)})
                        : 
                        <NoItems/>
                    }
            </NoPadBoarderDiv>
        </Container>
        
    );
}

const MapInfo=(state)=>{
    return{
        itemsV: getVisableItem(state.items, state.filter),
        items: state.items,
        all: state
    }
}

export default connect(MapInfo)(ItemList);
