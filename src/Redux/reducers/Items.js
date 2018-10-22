const ItemsReducerDefault = [];
export default (state = ItemsReducerDefault, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]

        case 'REMOVE_ITEM':
            return state.filter(({name}) => name !== action.name);

        case 'EDIT_ITEM': 
            return state.map((item) => {
                if(item.name === action.name){
                    return{
                        ...item,
                        ...action.updates
                    }
                }
                else{
                    return item;
                }
            });
        case 'CLEAR_ITEMS':
            return state = ItemsReducerDefault;
            
        default:
            return state;
    }
};