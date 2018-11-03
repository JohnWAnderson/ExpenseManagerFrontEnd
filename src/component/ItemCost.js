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
            <Row>
                { props.times > 1 ? <Col><Col>Recurring:{props.times}</Col><Col>${props.cost/100}</Col></Col>: <Col></Col>}
                <Col>
                    ${parseFloat(props.cost/100 * props.times).toFixed(2)}
                </Col>
            </Row>
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