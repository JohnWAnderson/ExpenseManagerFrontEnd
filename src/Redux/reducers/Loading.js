const LoadingReducerDefault = {
    clicked: false,
    serverFail: false
}

export default  (state = LoadingReducerDefault, action) => {
    switch(action.type){
        case 'LOADING_BOOLEAN':
            if(action.clicked)
                document.body.style.cursor='wait';
            else
                document.body.style.cursor='default';
            return {
                ...state,
                clicked: action.clicked
            }

        case 'SERVER_BOOLEAN':
            return {
                ...state,
                serverFail: action.serverFail
            }

        case 'SET_DEFAULT':
            return LoadingReducerDefault;

        default:
            return state;
    }
};