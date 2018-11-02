
import React from 'react';
import styled from 'styled-components';
import ItemList from './ItemList';
import {Link} from 'react-router-dom';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';

const AppDashBoard = styled.div`
    padding: 0;
    align: center;
    text-align: center;
    height: 92%;
    position: relative;
`

export default () =>{
    return(
        <AppDashBoard>
            <PageInformation/>
            <FilterPicker/>
            <ItemList/>
        </AppDashBoard>
    );
}