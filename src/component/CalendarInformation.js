
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';



export default (props) =>{
    return(
        <div>
            {props.items > 0 ? 
            <div>This month contains {props.items} items which totals to: ${(props.cost/100).toFixed(2)}</div>:
            <div>Page month no items</div>}
        </div>
    );
}
