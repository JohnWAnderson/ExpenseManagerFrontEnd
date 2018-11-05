import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';
import {Container, Row, Col } from 'reactstrap';
import Media from "react-media";

const MobalDescriptionRow = styled(Row)`
    word-wrap: break-word;
    font-size: 12px;
`

const DescriptionRow = styled(Row)`
    word-wrap: break-word;
    background: #f4f4f4;
    font-size: 16px;
`

const DiscriptionColorDiv = styled.div`
    background: #f4f4f4;
`
const BottomBoarderDiv = styled.div`
    border-bottom: 3px solid black;
`

const ItemDiv = styled.div`
    border-collapse: collapse;
    position: relative;
    display: table;
    height: 100%;
    margin: 0;
    padding: 0;
    width:100%;
`   

const ItemPartDiv =styled.div`
    word-wrap: break-word;
    max-width: 300px;
    vertical-align: middle;
    vertical-align: top;
    display: table-cell;
    position: relative;
    width: 33%;
    height: 100%;
    padding: 0;
    margin: 0;
`

const ItemPartDisDiv =styled.div`
    max-width: 300px;
    text-align:center;
    vertical-align: middle;
    display: table-cell;
    word-wrap: break-word;
    position: relative;
    max-width: 300px;
    width: 34%;
    padding: auto;
    margin: auto;
`

const Item = (props) => (
    <BottomBoarderDiv>
        <Media query="(max-width: 1200px)">
            {matches =>
            matches ? (
                <div>
                    <Row><Col><ItemName name={props.name} index={props.index}/></Col></Row>
                    <ItemDescription description={props.description}/>
                    <Row><Col><ItemCost {...props}/></Col></Row>
                </div>
            ) : (
                <Container>
                    <Row>
                    <Col>
                        <ItemName name={props.name} index={props.index}/>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <ItemCost {...props}/>
                    </Col>
                    </Row>
                    <ItemDescription description={props.description}/>
                </Container>
            )
            }
        </Media>
    </BottomBoarderDiv>
);



const ItemDescription = (props) => {
    return (
    <Media query="(max-width: 1200px)">
    {matches =>
    matches ? (
        <MobalDescriptionRow>
            <Col> 
                {!!props.description && <DiscriptionColorDiv>Description:  {props.description}</DiscriptionColorDiv>}
            </Col>
        </MobalDescriptionRow>
        ) : (
        <DescriptionRow>
            <Col>
                {!!props.description && <div>Description:  {props.description}</div>}
            </Col>
        </DescriptionRow>
        )
        }
    </Media>
   );
}


const ItemH3 = styled.h3`
    text-align:left;
    position: relative;
    font-size: 30px;
    height: 100%;
    margin: 0;
    padding: 0;
`

const ItemNameDiv = styled.div`
    @media (max-width: 1330px) {

    }
`

const EditLink = styled(Link)`
    color: blue;
    text-decoration: none;
    text-align: left ;
    position: relative;
    bottom: 0;
    font-size: 12px;
    padding: 0;
`

const HeaderLink = styled(Link)`
    color: blue;
    text-decoration: none;
    text-align: left ;
    font-size: 18px;
    position: relative;
`

const ItemName = (props) => (
    <ItemNameDiv>
    <Media query="(max-width: 1200px)">
        {matches =>
        matches ? (
            <Container>
                <ItemH3>
                    <Row>
                    <HeaderLink to={`/edit/${props.index}`}>
                        {props.name}
                    </HeaderLink>
                    </Row>
                </ItemH3>
            </Container>
        ) : (
            <ItemH3>
                {props.name}
                <EditLink to={`/edit/${props.index}`}>
                    edit
                </EditLink>
            </ItemH3>
        )
        }
    </Media>
    </ItemNameDiv>
   );
   

export default Item;