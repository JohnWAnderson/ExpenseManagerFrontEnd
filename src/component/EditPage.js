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
import styled from 'styled-components';

const MainDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
    min-width: 1100px;
`
const PageFormH1 = styled.h1`
    text-align: center ;
    padding-bottom: 20px;
    padding-left: 2px;
    background: #D0D1D1;
`
const RemoveButton = styled.button`
    text-align: center ;
    margin-bottom: 25px;
    padding-left: 2px;
    color: red;
    font-size: 20px;
    background: 0;
`

const PageFormDiv = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    margin auto;
    
`

const EditPageButtonDiv = styled.div`
    padding: 0;
    text-align: center;
    background: #D0D1D1;
`

class EditPage extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        showDialog: false
        }
    }
    render() {
    const item=this.props.items[this.props.match.params.id-1]
    if(!!item){
        const holder = item.name;
        return(
            <MainDiv>
            <PageFormH1>Edit Item Page</PageFormH1>
            <EditPageButtonDiv>
            <RemoveButton  disabled={this.props.Loading.clicked} onClick={()=>{
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
            }}>Remove Item</RemoveButton> 
            </EditPageButtonDiv>
            <PageFormDiv>
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
      items: state.items,
      Loading: state.loading
  }
}
export default connect(MapUserInfo)(EditPage);