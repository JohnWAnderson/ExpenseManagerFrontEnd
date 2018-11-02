import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';

const Item = (props) => (
 <div>
    <div>
        <ItemName name={props.name} index={props.index}/>
    </div>
    <div>
        {props.description}
    </div>
    <div>
        <ItemCost {...props}/>
    </div>
 </div>
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