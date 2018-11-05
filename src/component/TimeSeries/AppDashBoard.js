
import React from 'react';
import styled from 'styled-components';
import ItemList from './ItemList';
import {Link} from 'react-router-dom';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';


export default () =>{
    return(
        <div>
            <PageInformation/>
            <FilterPicker/>
            <ItemList/>
        </div>
    );
}