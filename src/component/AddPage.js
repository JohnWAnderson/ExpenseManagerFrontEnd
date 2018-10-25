import React from 'react';
import ItemForm from './ItemForm';
import { CreateItem } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import {LoadingChange, ServerChange} from '../Redux/Actions/Loading';
import { addItem } from '../Redux/Actions/Items';
import {TimesItemChange} from '../Redux/TimesChange';
import styled from 'styled-components';
const MainDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
`
const PageFormDiv = styled.div`
    text-align: center;
    align:center;
    position: relative;
    width: 70%;
    margin: auto;
`

const PageFormH1 = styled.h1`
    text-align: center ;
    padding-bottom: 25px;
    padding-left: 2px;
`

const AddPage = (props) =>{
    return(
    <MainDiv>
        <PageFormDiv>
        <PageFormH1>Add Item</PageFormH1>
        <ItemForm
            onSubmit={(item) => {
                CreateItem(item).then(response => {
                    props.dispatch(LoadingChange({clicked: false}));
                    if(response.available){
                        const timeItem = {...item, times: TimesItemChange(item, props.filter.startDate, props.filter.endDate)};
                        props.dispatch(addItem(timeItem))
                        props.history.push('/')
                    }
                    else if(response.failed){
                        console.log("failed");
                        props.dispatch(ServerChange({serverFail: true}));
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
