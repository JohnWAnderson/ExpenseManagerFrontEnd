import React from 'react';
import ItemForm from './ItemForm';
import { UpdateItems, DeleteItem} from '../../ApiMethods/Account';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { connect } from 'react-redux';
import {LoadingChange} from '../../Redux/Actions/Loading';
import { editItem, removeItem} from '../../Redux/Actions/Items';
import {TimesItemChange} from '../../Redux/TimesChange';
import NotFound from '../NotFound';
import styled from 'styled-components';
import RemoveItemModal from './RemoveItemModal';

const ItemPageHeader = styled.h1`
display:block;
text-align:center;
`

const CenterDiv = styled.div`
display:block;
text-align:center;
`

class EditPage extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        showDialog: false
        }
    this.RemoveItem = this.RemoveItem.bind(this);
    }

    RemoveItem=(item)=>{
        this.props.dispatch(LoadingChange({clicked: true}));
        const newItem = ({...item, userName: this.props.User.currentUser.username})
        DeleteItem(newItem).then(response => {
            this.props.dispatch(LoadingChange({clicked: false}));        
            if(response.available){
                this.props.dispatch(removeItem({name: newItem.name}));    
                this.props.history.push('/')  
            }
        });
    }

    render() {
    const item=this.props.items[this.props.match.params.id-1]
    if(!!item){
        const holder = item.name;
        return(
            <div>
            <ItemPageHeader>Edit Item Page</ItemPageHeader>
            <CenterDiv>
            <RemoveItemModal item={item} RemoveItem={this.RemoveItem}/>
            </CenterDiv>
            <div>
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
            </div>
            </div>
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