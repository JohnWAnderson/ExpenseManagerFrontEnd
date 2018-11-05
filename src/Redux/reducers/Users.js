const UserReducerDefault  = {
    currentUser: {
        name:'',
        username: ''
    },
    isAuthenticated:false
    };
export default (state = UserReducerDefault, action) => {
    switch(action.type){
        case 'ADD_USER':
            return {
                currentUser: action.user.currentUser,
                isAuthenticated: action.user.isAuthenticated
            }

        case 'AUTH_USER':
            return {
                ...state,
                isAuthenticated: action.user.isAuthenticated
            }
            
        case 'REMOVE_USER':         
            return state = UserReducerDefault

        default:
            return state;
    }
};