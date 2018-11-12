import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import AnalyticsPieGraph from './AnalyticsPieGraph';
import AnalyticsPicker from './AnalyticsPicker';
import styled from 'styled-components';
import Media from "react-media";

const CenterRow = styled(Row)`
    text-align:center;
`

const CenterCol = styled(Col)`
    text-align:center;
`

export default () => (
    <Media query="(max-width: 1200px)">
        {matches => matches ? (
            <Container>
                <CenterRow><AnalyticsPicker/></CenterRow>
                <CenterRow><AnalyticsPieGraph/></CenterRow>
            </Container>
        ) : (
            <Container>
                <Row>
                    <CenterCol><AnalyticsPicker/></CenterCol>
                    <CenterCol><AnalyticsPieGraph/></CenterCol>
                </Row>
            </Container>
        )
        }
    </Media>
)
