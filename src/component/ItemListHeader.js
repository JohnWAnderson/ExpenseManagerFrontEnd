import React from 'react';
import styled from 'styled-components';

const ItemDiv = styled.div`
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    padding: 0;
    min-height: 50px;
    border-bottom: 2px solid black;    
`   
const ItemHeaderDiv =styled.div`
    text-align: center;
    display: inline-block;
    width: 33%;
    height: 100%;
    padding: 0;
`

const ItemHeaderMidDiv =styled.div`
    display: inline-block;
    width: 34%;
    height: 100%;
    padding: 0;
`

const HeaderRightH3 = styled.h3`
    vertical-align: middle;
    position: relative;
    font-size: 30px;
    margin: 0;
    padding: 0;
`   
const HeaderLeftH3 = styled.h3`
    text-align:left;
    vertical-align: middle;
    position: relative;
    font-size: 30px;
    margin: 15px 20px;
    padding: 0;
`   

export default ()=>{
    return(
    <ItemDiv>
        <ItemHeaderDiv><HeaderLeftH3>Name</HeaderLeftH3></ItemHeaderDiv>
        <ItemHeaderMidDiv></ItemHeaderMidDiv>
        <ItemHeaderDiv><HeaderRightH3>Cost</HeaderRightH3></ItemHeaderDiv>
    </ItemDiv>
    );
}