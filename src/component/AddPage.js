import React from 'react';
import ItemForm from './ItemForm';
import { CreateItem } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import {LoadingChange} from '../Redux/Actions/Loading';
import { addItem } from '../Redux/Actions/Items';
import {TimesItemChange} from '../Redux/TimesChange';
import styled from 'styled-components';


const AddPage = (props) =>{
    return(
    <div>
        <div>
        <h1>Add Item Page</h1>
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
        </div>
    </div>
    );
};

const MapUserInfo=(state)=>{
    return{
        User: state,
        filter: state.filter
    }
  }

export default connect(MapUserInfo)(AddPage);
