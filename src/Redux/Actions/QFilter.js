
export const setStartDateQ = (StartDate = undefined) =>({
    type: 'SET_QUARTER_START',
    StartDate
});

export const setEndDateQ = (EndDate = undefined) =>({
    type: 'SET_QUARTER_END',
    EndDate
});

export const resetFilterQ = () => ({
    type: 'SET_QUARTER_DEFAULT'
})