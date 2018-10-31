import React from 'react';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';
import styled from 'styled-components';
import Signup from '../Account/Signup';
const MainDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
    min-width: 1100px;
`

const AppDashBoard = styled.div`
    padding: 0;
    align: center;
    text-align: center;
    height: 100%;
    position: relative;
    flex-direction: column;
`

const DatePicker= (props) =>{ 
        return(
            <MainDiv>
            {(props.User.isAuthenticated) ?
                <AppDashBoard>
                    <FilterPicker/>
                    <PageInformation/>
                    <Link to="/calendar">
                    [calendar prototype link]
                    </Link>
                    <ItemList/>
                </AppDashBoard> :
                        <Signup/>} 
            </MainDiv>
        );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(DatePicker);