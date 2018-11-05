
import React from 'react';

export default (props) =>{
    return(
        <div>
            {props.items > 0 ? 
            <div>This month contains {props.items} items which totals to: ${(props.cost/100).toFixed(2)}</div>:
            <div>Page month no items</div>}
        </div>
    );
}
