export const addUser = ({currentUser: {name ='', username=''}, isAuthenticated=false} = {}) =>({
    type: 'ADD_USER',
    user:{
        currentUser:{
            name, username
        },
        isAuthenticated
    }
});

export const authUser = ({isAuthenticated=false} = {}) =>({
    type: 'AUTH_USER',
    user:{
        isAuthenticated
    }
});

export const removeUser = () => ({
    type: 'REMOVE_USER'
});

export const editUser = (username, updates) => ({
    type: 'EDIT_USER',
    username,
    updates
});
