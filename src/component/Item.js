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
`   

const ItemPartDiv =styled.div`
    word-wrap: break-word;
    max-width: 300px;
    vertical-align: middle;
    vertical-align: top;
    display: table-cell;
    position: relative;
    width: 33%;
    height: 100%;
    padding: 0;
    margin: 0;
`

const ItemPartDisDiv =styled.div`
    max-width: 300px;
    text-align:center;
    vertical-align: middle;
    display: table-cell;
    word-wrap: break-word;
    position: relative;
    max-width: 300px;
    width: 34%;
    padding: auto;
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


const ItemNameDiv = styled.div`
    position: relative;
    vertical-align: middle;
    text-align:left;
    margin: 0 auto;
    top:50%;
    height: 100%;
    padding: 20px;
    margin: auto;
`

const ItemH3 = styled.h3`
    text-align:left;
    position: relative;
    font-size: 30px;
    height: 100%;
    margin: 0;
    padding: 0;
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