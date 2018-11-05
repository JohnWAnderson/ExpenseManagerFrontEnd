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
                { props.times > 1 ? <RecurringCost cost={props.cost} times={props.times}/>: <Row></Row>}
                <TotalCost cost={props.cost} times={props.times}/>
            </ItemCostDiv>
        ) : (
            <ItemCostDiv>
                { props.times > 1 ? <RecurringCost cost={props.cost} times={props.times}/>: <Col></Col>}
                <TotalCost cost={props.cost} times={props.times}/>
            </ItemCostDiv>
        )
        }
    </Media>
    </Row>
   );

   const ColRight = styled(Col)`
    text-align:Right;
    align:Right;
    `

    const RecurringCost = (props)=>(
        <Row>
            <ColRight>
                Recurring: {props.times}
            </ColRight>
            <Col>
                Cost: ${props.cost/100}
            </Col>
        </Row>
    )


   const TotalCost = (props)=>(
    <Row>
        <ColRight>Total:</ColRight>
        <Col>
            ${parseFloat(props.cost/100 * props.times).toFixed(2)}
        </Col>
    </Row>
   )
   
   
   export default ItemCost;