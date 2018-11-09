import React from 'react';
import ItemForm from './ItemForm';
import { CreateItem } from '../../ApiMethods/Account';
import { connect } from 'react-redux';
import {LoadingChange} from '../../Redux/Actions/Loading';
import { addItem } from '../../Redux/Actions/Items';
import {TimesItemChange} from '../../Redux/TimesChange';
import styled from 'styled-components';

const MainFormPageDiv = styled.div`
    position:relative;
    width:80%;
    text-align:center;
    align:center;
    margin: auto;
    padding: auto;
`

const ItemPageHeader = styled.h1`
display:block;
text-align:center;
`

const AddPage = (props) =>{
    return(
    <MainFormPageDiv>
        <ItemPageHeader>Add Item Page</ItemPageHeader>
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
    </MainFormPageDiv>
    );
};

const MapUserInfo=(state)=>{
    return{
        User: state,
        filter: state.filter
    }
  }

export default connect(MapUserInfo)(AddPage);
