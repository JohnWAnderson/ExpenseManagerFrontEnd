import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';

const ItemDiv = styled.div`
    border-collapse: collapse;
    position: relative;
    display: table;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    width:100%;
    min-height: 72px;
    max-height: 72px;
`   
const HeaderLink = styled(Link)`
    color: blue;
    text-decoration: none;
    text-align: left ;
    position: relative;
    bottom: 0;
    font-size: 12px;
    padding: 0;
`

const ItemPartDiv =styled.div`
    vertical-align: top;
    display: table-cell;
    position: relative;
    width: 33%;
    height: 100%;
    padding: 0;
    margin: 0;
`

const ItemH3 = styled.h3`
    text-align:left;
    position: relative;
    font-size: 30px;
    height: 100%;
    margin: 0;
    padding: 0;
`   

const ItemPartDisDiv =styled.div`
    vertical-align: top;
    display: table-cell;
    word-wrap: break-word;
    position: relative;
    max-width: 457px;
    width: 34%;
    height: 100%;
    padding: 0;
    margin: 0;
`

const ItemNameDiv = styled.div`
    position: relative;
    text-align:left;
    margin: 0 auto;
    height: 100%;
    padding: 20px;
    margin: auto;
`
const Item = (props) => (
 <ItemDiv>
    <ItemPartDiv>
        <ItemName name={props.name} index={props.index}/>
    </ItemPartDiv>
    <ItemPartDisDiv>
        {props.description}
    </ItemPartDisDiv>
    <ItemPartDiv>
        <ItemCost {...props}/>
    </ItemPartDiv>
 </ItemDiv>
);

const ItemName = (props) => (
    <ItemNameDiv>
        <ItemH3>
        {props.name}
        <HeaderLink to={`/edit/${props.index}`}>
            edit
        </HeaderLink>
        </ItemH3>
    </ItemNameDiv>
   );
   

export default Item;