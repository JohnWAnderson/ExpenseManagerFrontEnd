import React from 'react';
import styled from 'styled-components';




const ItemCost = (props) => (
    <div>
        <div>
            { props.times > 1 ? <div><div>Recurring:{props.times}</div><div>${props.cost/100}</div></div> : <div></div>}
        </div>
        <div>
            <div>${parseFloat(props.cost/100 * props.times).toFixed(2)} </div>
        </div>
    </div>
   );
   
   
   export default ItemCost;