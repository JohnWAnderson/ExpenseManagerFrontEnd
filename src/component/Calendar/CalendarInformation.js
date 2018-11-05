
import React from 'react';
import styled from 'styled-components';

// const PageInfoRow = styled(Row)`
//     color: black;
//     text-decoration: none;
//     font-family: Georgia;
//     font-size: 20px;
//     position: relative;
//     vertical-align: middle;
//     text-align:center;
// `

export default (props) =>{
    return(
        <div>  
            {props.items > 0 ? 
            <div>This month contains {props.items} items which totals to: ${(props.cost/100).toFixed(2)}</div>:
            <div>Page month no items</div>}
        </div>
    );
}

// {props.items > 0 ? 
//     <div></><PageInfoRow><Col><h1>This month contains {props.items} items</h1></Col></PageInfoRow> <PageInfoRow><Col><h1>Totaling ${props.Sum/100}</h1></Col></PageInfoRow></div>:
//     <PageInfoRow>Page contains no items</PageInfoRow>}
// </Container>