import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';

const ItemDiv = styled.div`
    border-collapse: collapse;
    position: relative;
    display: block;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    width:100%;
    min-height: 35px;
`   
const HeaderLink = styled(Link)`
    color: blue;
    text-decoration: none;
    text-align: left ;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    padding: 0;
`

const ItemPartDiv =styled.div`
    display: inline-block;
    vertical-align: center;
    position: relative;
    width: 33%;
    height: 100%;
    padding: 0;
`
const ItemPartDisDiv =styled.div`
    display: inline-block;
    vertical-align: center;
    position: relative;
    width: 34%;
    height: 100%;
    padding: 0;
`

const ItemH3 = styled.h3`
    text-align:left;
    position: relative;
    font-size: 30px;
    margin: 0;
    padding: 0;
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
    <ItemPartDisDiv>
        {props.description}
    </ItemPartDisDiv>
    <ItemPartDiv>
        <ItemCost {...props}/>
    </ItemPartDiv>
 </ItemDiv>
);


export default Item;