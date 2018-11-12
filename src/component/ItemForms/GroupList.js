import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';

const GroupList = (props) =>{
    console.log(props);
    return(
        <div>
            {props.list.toString()}
        </div>
    );
};


export default GroupList;
