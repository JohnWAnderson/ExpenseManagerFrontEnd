const GroupReducerDefault = [];

export default (state = GroupReducerDefault, action) => {
    switch(action.type){
        case 'ADD_GROUP':
            return [
                ...state,
                action.group
            ]

        case 'REMOVE_GROUP':
            return state.filter((group) => group !== action.group);

        case 'CLEAR_GROUP':
            return state = GroupReducerDefault;
            
        default:
            return state;
    }
};