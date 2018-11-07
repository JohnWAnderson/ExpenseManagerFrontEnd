import moment from 'moment';


const QFilterReducerDefault = {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
}

export default  (state = QFilterReducerDefault, action) => {
    switch(action.type){
        case 'SET_START_DATE_FILTERQ':        
            return {
                ...state,
                startDate: action.startDate
            };

        case 'SET_END_DATE_FILTERQ':   
            return {
                ...state,
                endDate: action.endDate
            };

        case 'SET_DEFAULTQ':
            return {
                startDate: moment().quarter(action.quarter).startOf('quarter'),
                endDate: moment().quarter(action.quarter).endOf('quarter')
            };

        default:
            return state;
    }
};