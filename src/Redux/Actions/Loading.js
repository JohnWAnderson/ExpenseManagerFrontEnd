export const LoadingChange = ({clicked: clicked=false} = {}) =>({
    type: 'LOADING_BOOLEAN',
    clicked
});

export const ServerChange = ({serverFail: serverFail=false} = {}) =>({
    type: 'SERVER_BOOLEAN',
    serverFail
});
