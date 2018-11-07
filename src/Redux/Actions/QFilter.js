
export const setStartDateQ = (startDate = undefined) =>({
    type: 'SET_QUARTER_START',
    startDate
});

export const setEndDateQ = (endDate = undefined) =>({
    type: 'SET_QUARTER_END',
    endDate
});

export const resetFilterQ = () => ({
    type: 'SET_QUARTER_DEFAULT'
})