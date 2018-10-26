import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';
import NoItems from './NoItems';

const ItemListDiv = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    border: 20px solid black;
    border-bottom: none;
    width: 70%;
    min-width: 750px;
    margin auto;
`
const ItemListTable = styled.table`
    position: relative;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    width: 100%;
` 
const ItemListTd = styled.td`
position: relative;
padding-top: 5px;
padding-bottom: 5px;
`

const ItemList =(props)=>{
    return(
        <ItemListDiv>
            <ItemListTable>
            <tbody>
                {props.itemsV.length > 0 ? 
                    props.itemsV.map((item,index)=>{
                    return(<tr key={index}><ItemListTd key={index}><Item key={index} {...item} index={props.items.indexOf(item)+1}/></ItemListTd></tr>)})
                    : 
                    <tr><ItemListTd><NoItems/></ItemListTd></tr>
                }
            </tbody>
            </ItemListTable>
        </ItemListDiv>
    );
}

const MapInfo=(state)=>{
    return{
        
        itemsV: getVisableItem(state.items, state.filter),
        items: state.items
    }
}

export default connect(MapInfo)(ItemList);
