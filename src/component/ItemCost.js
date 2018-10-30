import React from 'react';
import styled from 'styled-components';

const ItemCostPartDIV =styled.div`
    display: inline-block;
    vertical-align: top;
    align: center;
    width: 33%;
    height: 100%;
    font-size: 16px;
`

const ItemCostDiv = styled.div`
    position: relative;
    display: block;
    height: 100%;
    padding: 30px;
`   

const ItemCost = (props) => (
    <ItemCostDiv>
        <ItemCostPartDIV>
            { props.times > 1 ? <div>${props.cost/100} Recurring:{props.times}</div> : <div></div>}
        </ItemCostPartDIV>
        <ItemCostPartDIV>
            ${parseFloat(props.cost/100 * props.times).toFixed(2)} 
        </ItemCostPartDIV>
    </ItemCostDiv>
   );
   
   
   export default ItemCost;