
import React from 'react';
import styled from 'styled-components';
import ItemList from './ItemList';
import {Link} from 'react-router-dom';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';

const MainApp = styled.div`
  padding: 0;
  marggin: 0;
  height: 92%;
  min-height: 92%;
  min-width: 100%;
  width: 100%;
  position: relative;
`

export default () =>{
    return(
        <MainApp>
            <PageInformation/>
            <FilterPicker/>
            <ItemList/>
        </MainApp>
    );
}