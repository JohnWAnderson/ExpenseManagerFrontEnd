export const addItem = ({name ='', description='', cost=0, duedate=0, recurring=false, recurringsize='none', enddate=false, endrecurring=0, times=1, qTimes=1, group='etc'} = {}) =>(
    {
    type: 'ADD_ITEM',
    item:{
        name,
        description,
        cost,
        duedate,
        recurring,
        recurringsize,
        enddate,
        endrecurring,
        times,
        qTimes,
        group
    }
});

export const removeItem = ({name}) => ({
    type: 'REMOVE_ITEM',
    name
});

export const editItem = (name, updates) => ({
    type: 'EDIT_ITEM',
    name,
    updates
});


export const clearItems = () => ({
    type: 'CLEAR_ITEMS'
});