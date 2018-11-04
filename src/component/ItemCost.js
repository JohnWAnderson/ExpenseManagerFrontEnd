import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import Media from "react-media";


const ItemCostDiv = styled.div`
    height:100%;
    width:100%;
    text-align:center;
`

const ItemCost = (props) => (
    <Row>
    <Media query="(max-width: 1200px)">
        {matches =>
        matches ? (
            <ItemCostDiv>
                { props.times > 1 ? <Row><Col>Recurring:{props.times}</Col><Col>${props.cost/100}</Col></Row>: <Col></Col>}
                <Row>
                    <Col></Col>
                    <Col>${parseFloat(props.cost/100 * props.times).toFixed(2)}</Col>
                </Row>
            </ItemCostDiv>
        ) : (
            <ItemCostDiv>
                { props.times > 1 ? <Col><Row><Col>Recurring:{props.times}</Col><Col>${props.cost/100}</Col></Row></Col> : <Col></Col>}
                <Row>
                    <Col>
                        ${parseFloat(props.cost/100 * props.times).toFixed(2)}
                    </Col>
                    <Col></Col>
                </Row>
            </ItemCostDiv>
        )
        }
    </Media>
    </Row>
   );
   
   
   export default ItemCost;