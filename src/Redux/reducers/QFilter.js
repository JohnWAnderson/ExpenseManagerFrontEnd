import moment from 'moment';


const QFilterReducerDefault = {
    StartDate: moment().quarter(moment().quarter()).startOf('quarter'),
    EndDate: moment().quarter(moment().quarter()).endOf('quarter')
}

export default  (state = QFilterReducerDefault, action) => {
    switch(action.type){
        case 'SET_QUARTER_START':        
            return {
                ...state,
                StartDate: action.StartDate
            };

        case 'SET_QUARTER_END':   
            return {
                ...state,
                EndDate: action.EndDate
            };

        case 'SET_QUARTER_DEFAULT':
            return QFilterReducerDefault;

        default:
            return state;
    }
};