import React from 'react';
import ItemForm from './ItemForm';
import { UpdateItems, DeleteItem} from '../ApiMethods/Account';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { connect } from 'react-redux';
import {LoadingChange} from '../Redux/Actions/Loading';
import { editItem, removeItem} from '../Redux/Actions/Items';
import {TimesItemChange} from '../Redux/TimesChange';
import NotFound from './NotFound';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';

const MainDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
`
const PageFormH1 = styled.h1`
    text-align: center ;
    padding-bottom: 10px;
    padding-left: 2px;
`
const RemoveButton = styled.button`
    text-align: center ;
    margin-bottom: 25px;
    padding-left: 2px;
`

const PageFormDiv = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    width: 70%;
    margin auto;
`
class EditPage extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        showDialog: false,
        }
    }
    render() {
    const item=this.props.items[this.props.match.params.id-1]
    if(!!item){
        const holder = item.name;
        return(
            <MainDiv>
            <PageFormDiv>
            <PageFormH1>Edit Item</PageFormH1>
            <RemoveButton onClick={()=>{
                confirmAlert({
                    title: 'Confirm to Delete',
                    message: `Are you sure to delete '${item.name}'.`,
                    buttons: [
                      {
                        label: 'Yes, Delete',
                        onClick: () => {
                        this.props.dispatch(LoadingChange({clicked: true}));
                        const newItem = ({...item, userName: this.props.User.currentUser.username})
                        DeleteItem(newItem).then(response => {
                            this.props.dispatch(LoadingChange({clicked: false}));        
                            if(response.available){
                                this.props.dispatch(removeItem({name: newItem.name}));    
                                this.props.history.push('/')  
                            }
                        });}
                      },
                      {
                        label: 'cancel',
                        onClick: () => {}
                      }
                    ]
                  })
            }}>Delete</RemoveButton>
            <ItemForm item={item}        
                    onSubmit={(item) => {
                        const newItem=({...item,oldName: holder})
                        UpdateItems(newItem).then(response => {
                            this.props.dispatch(LoadingChange({clicked: false}));
                            if(response.available){
                                const timeItem = {...item, times: TimesItemChange(item, this.props.filter.startDate, this.props.filter.endDate)};          
                                this.props.dispatch(editItem(holder,timeItem));
                                this.props.history.push('/')  
                            }
                        });
                    }}
                    />
            </PageFormDiv>
            </MainDiv>
        );
    }
     else{
        return(
            <div>
                <NotFound/>
            </div>
        );
   }}
};

const MapUserInfo=(state)=>{
  return{
      User: state.user,
      filter: state.filter,
      items: getVisableItem(state.items, state.filter)
  }
}
export default connect(MapUserInfo)(EditPage);