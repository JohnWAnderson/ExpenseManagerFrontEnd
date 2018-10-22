import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';

const ItemDiv = styled.div`
    border: 1px solid black;
    position: relative;
    display: block;
    height: 100%;
`   
const HeaderLink = styled(Link)`
    color: blue;
    text-decoration: none;
    text-align: left ;
    position: absolute;
    bottom: 0;
    font-size: 12px;
`

const ItemPartDiv =styled.div`
    display: inline-block;
    vertical-align: center;
    position: relative;
    width: 33%;
    height: 100%;
`

const ItemH3 = styled.h3`
    text-align:left;
    position: relative;
    font-size: 30px;
    margin: 0;
`   
const Item = (props) => (
 <ItemDiv>
    <ItemPartDiv>
        <ItemH3>
        {props.name}
        <HeaderLink to={`/edit/${props.index}`}>
            <div>edit</div>
        </HeaderLink>
        </ItemH3>
    </ItemPartDiv>
    <ItemPartDiv>
        {props.description}
    </ItemPartDiv>
    <ItemPartDiv>
        <ItemCost {...props}/>
    </ItemPartDiv>
 </ItemDiv>
);


export default Item;