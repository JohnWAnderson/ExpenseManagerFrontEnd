import React from 'react';
import styled from 'styled-components';


const ItemCostDiv = styled.div`
    position: relative;
    display: block;
    height: 100%;
`   

const ItemCostPartDIV =styled.div`
    display: inline-block;
    vertical-align: middle;
    text-align:center;
    width: 33%;
    height: 100%;
    font-size: 16px;
`

const ItemCenterDiv = styled.div`
    position: relative;
    height: 100%;
    margin:auto;
    padding:auto;
    vertical-align: middle;
    text-align:center;
`   


const ItemCost = (props) => (
    <ItemCostDiv>
        <ItemCostPartDIV>
            { props.times > 1 ? <ItemCenterDiv><div>Recurring:{props.times}</div><div>${props.cost/100}</div></ItemCenterDiv> : <div></div>}
        </ItemCostPartDIV>
        <ItemCostPartDIV>
            <ItemCenterDiv>${parseFloat(props.cost/100 * props.times).toFixed(2)} </ItemCenterDiv>
        </ItemCostPartDIV>
    </ItemCostDiv>
   );
   
   
   export default ItemCost;