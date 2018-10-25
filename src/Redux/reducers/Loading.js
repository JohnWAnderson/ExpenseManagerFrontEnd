const LoadingReducerDefault  = {
    clicked: false
};
export default (state = LoadingReducerDefault, action) => {
    switch(action.type){
        case 'LOADING_BOOLEAN':
            if(action.clicked)
                document.body.style.cursor='wait';
            else
                document.body.style.cursor='default';
            return {
                clicked: action.clicked
            }
            
        default:
            return state;
    }
};