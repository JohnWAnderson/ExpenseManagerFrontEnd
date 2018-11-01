import React from 'react';
import ItemForm from './ItemForm';
import { CreateItem } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import {LoadingChange} from '../Redux/Actions/Loading';
import { addItem } from '../Redux/Actions/Items';
import {TimesItemChange} from '../Redux/TimesChange';
import styled from 'styled-components';
const MainDiv = styled.div`
    position:relative;
    height: auto;
    min-width: 900px;
`
const PageFormDiv = styled.div`
    text-align: center;
    align:center;
    position: relative;
    margin: auto;
`

const PageFormH1 = styled.h1`
    text-align: center ;
    padding-bottom: 25px;
    padding-left: 2px;
    background: #D0D1D1;
    margin-bottom: 10px;
`

const AddPage = (props) =>{
    return(
    <MainDiv>
        <PageFormDiv>
        <PageFormH1>Add Item Page</PageFormH1>
        <ItemForm
            onSubmit={(item) => {
                CreateItem(item).then(response => {
                    if(response.available){
                        const timeItem = {...item, times: TimesItemChange(item, props.filter.startDate, props.filter.endDate)};
                        props.dispatch(addItem(timeItem))
                        props.dispatch(LoadingChange({clicked: false}));
                        props.history.push('/')
                    }
                });
            }}
        />
        </PageFormDiv>
    </MainDiv>
    );
};

const MapUserInfo=(state)=>{
    return{
        User: state,
        filter: state.filter
    }
  }

export default connect(MapUserInfo)(AddPage);
