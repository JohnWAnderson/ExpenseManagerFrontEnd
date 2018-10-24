import React from 'react';
import ItemForm from './ItemForm';
import { UpdateItems, DeleteItem} from '../ApiMethods/Account';
import { connect } from 'react-redux';
import { editItem, removeItem} from '../Redux/Actions/Items';
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

const EditPage = (props) =>{
    const item=props.items[props.match.params.id-1]
    if(!!item){
        const holder = item.name;
        return(
            <MainDiv>
            <PageFormDiv>
            <PageFormH1>Edit Item</PageFormH1>
            <RemoveButton onClick={()=>{
                const newItem = ({...item, userName: props.User.currentUser.username})
                DeleteItem(newItem).then(response => {        
                    if(response.available){
                        props.dispatch(removeItem({name: newItem.name}));    
                        props.history.push('/')  
                    }
                });
            }}>Remove</RemoveButton>
            <ItemForm item={item}        
                    onSubmit={(item) => {
                        const newItem=({...item,oldName: holder})
                        UpdateItems(newItem).then(response => {
                            if(response.available){          
                                props.dispatch(editItem(holder,item)); 
                                props.history.push('/')  
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
   }
};

const MapUserInfo=(state)=>{
  return{
      User: state.user,
      items: getVisableItem(state.items, state.filter)
  }
}
export default connect(MapUserInfo)(EditPage);