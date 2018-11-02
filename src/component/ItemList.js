import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';
import NoItems from './NoItems';
import ItemListHeader from './ItemListHeader';

const ItemListDiv = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    border: 1px solid black;    
    border-radius: 10px;
    border-bottom: 0;
    width: 70%;
    min-width: 900px;
    margin auto;
`
const ItemListTable = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    position: relative;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    width: 100%;
` 
const ItemListTd = styled.td`
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
`

const ItemListTr = styled.tr`
    margin: 0;
    padding: 0;
    border: 0;
    width:100%;
    border-bottom: 1px solid black;   
    border-radius: 10px; 
`

const ItemList =(props)=>{
    return(
        <ItemListDiv>
        <ItemListHeader/>
            <ItemListTable>
            <tbody>
                {props.itemsV.length > 0 ? 
                    props.itemsV.map((item,index)=>{
                    return(<ItemListTr key={index}><ItemListTd key={index}><Item key={index} {...item} index={props.items.indexOf(item)+1}/></ItemListTd></ItemListTr>)})
                    : 
                    <ItemListTr><ItemListTd><NoItems/></ItemListTd></ItemListTr>
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
