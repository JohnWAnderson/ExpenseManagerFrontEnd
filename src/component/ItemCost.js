import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';



const ItemCost = (props) => (
    <Row>
        { props.times > 1 ? <Col><Row><Col>Recurring:{props.times}</Col></Row> <Row><Col>${props.cost/100}</Col></Row></Col>: <Col></Col>}
        <Col>
            ${parseFloat(props.cost/100 * props.times).toFixed(2)}
        </Col>
    </Row>
   );
   
   
   export default ItemCost;