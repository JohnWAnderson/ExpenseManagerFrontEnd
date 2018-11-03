import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';
import { Row, Col } from 'reactstrap';

const DescriptionRow = styled(Row)`
    word-wrap: break-word;
    border: 1px solid black; 
`

const DescriptionCol = styled(Col)`
    word-wrap: break-word;
    width:34%;
    text-align:center;
`

const NormalCol = styled(Col)`
    word-wrap: break-word;
    width:380px;
    text-align:center;
`

const Item = (props) => (
 <DescriptionRow>
    <NormalCol>
        <ItemName name={props.name} index={props.index}/>
    </NormalCol>
    <DescriptionCol>
        {props.description}
    </DescriptionCol>
    <NormalCol>
        <ItemCost {...props}/>
    </NormalCol>
 </DescriptionRow>
);


const ItemName = (props) => (
    <div>
        <h3>
        {props.name}
        <Link to={`/edit/${props.index}`}>
            edit
        </Link>
        </h3>
    </div>
   );
   

export default Item;