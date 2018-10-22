export const setNameFilter = (name = '') =>({
    type: 'SET_NAME_FILTER',
    name
});

export const sortByCost = () =>({
    type: 'SORT_BY_COST'
});

export const setStartDate = (startDate = undefined) =>({
    type: 'SET_START_DATE_FILTER',
    startDate
});

export const setEndDate = (endDate = undefined) =>({
    type: 'SET_END_DATE_FILTER',
    endDate
});

export const resetFilter = () => ({
    type: 'SET_DEFAULT'
})