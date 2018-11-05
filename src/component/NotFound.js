import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const NotFound = () =>(
    <Container>
        <Row>
        404 error <Link to="/">Go Home</Link>
        </Row>
    </Container>
);

export default NotFound;