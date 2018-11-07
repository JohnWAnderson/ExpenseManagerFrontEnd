import moment from 'moment';

export const setStartDateQ = (startDate = undefined) =>({
    type: 'SET_START_DATE_FILTERQ',
    startDate
});

export const setEndDateQ = (endDate = undefined) =>({
    type: 'SET_END_DATE_FILTERQ',
    endDate
});

export const resetFilterQ = (quarter = moment().quarter()) => ({
    type: 'SET_DEFAULTQ',
    quarter
})