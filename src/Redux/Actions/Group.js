export const addGroup = ({group='etc'} = {}) =>(
    {
    type: 'ADD_GROUP',
    group: group
});

export const removeGroup = ({group}) => ({
    type: 'REMOVE_GROUP',
    group
});

export const clearGroup = () => ({
    type: 'CLEAR_GROUP'
});