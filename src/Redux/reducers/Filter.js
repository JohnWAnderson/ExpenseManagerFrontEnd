import moment from 'moment';


const filterReducerDefault = {
    name: '',
    sortby: 'cost',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

export default  (state = filterReducerDefault, action) => {
    switch(action.type){
        case 'SET_NAME_FILTER':
            return {
                ...state,
                name: action.name
            };
        case 'SORT_BY_COST':
            return {
                ...state,
                sortby:'cost'
            }
        case 'SET_START_DATE_FILTER':        
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE_FILTER':   
            return {
                ...state,
                endDate: action.endDate
            };

        case 'SET_DEFAULT':
            return filterReducerDefault;
        default:
            return state;
    }
};