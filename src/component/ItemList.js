import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';
import NoItems from './NoItems';
import ItemListHeader from './ItemListHeader';

const ItemList =(props)=>{
    return(
        <div>
        <ItemListHeader/>
            <table>
            <tbody>
                {props.itemsV.length > 0 ? 
                    props.itemsV.map((item,index)=>{
                    return(<tr key={index}><td key={index}><Item key={index} {...item} index={props.items.indexOf(item)+1}/></td></tr>)})
                    : 
                    <tr><td><NoItems/></td></tr>
                }
            </tbody>
            </table>
        </div>
    );
}

const MapInfo=(state)=>{
    return{
        
        itemsV: getVisableItem(state.items, state.filter),
        items: state.items
    }
}

export default connect(MapInfo)(ItemList);
