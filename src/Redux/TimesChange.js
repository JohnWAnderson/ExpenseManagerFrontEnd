import moment from 'moment';

export const TimesItemChange = (item, startDate, endDate) =>{
        let times = 1;
        if(item.recurring){
            const duedate = moment(item.duedate);
            const recurringsize = item.recurringsize;
            let startF= moment(startDate).startOf('day');
            let endF = moment(endDate).startOf('day');
            if(duedate.isBefore(startF, 'day')){
                times = 0        
                startF = findNewStart(duedate, startF, recurringsize)
             }
             else
                startF = duedate;
            
                
            if(item.enddate){
                const endR = moment(item.endrecurring);
                if(endR.isBefore(endF, 'day'))
                    endF = endR;
            } 
            if(endF.isBefore(startF))
                return 0;
            
            const tempCount = getNewCount(startF, endF, recurringsize); 
            times = tempCount < 0 ? times: tempCount + times; 
        }
              
        return times;
};

const findNewStart = (duedate, startF, recurringsize) =>{
    switch(recurringsize){
        case "daily":
            return startF
        case "weekly":
            return moment(duedate).add(startF.diff(duedate, 'weeks'), 'weeks').startOf('day');
        case "biweekly":
            return moment(duedate).add(Math.floor(startF.diff(duedate, 'weeks')/2), 'weeks').startOf('day');
        case "monthly":
            return moment(duedate).add(startF.diff(duedate, 'month'), 'month').startOf('day');
        default:
            return 1;
    }
}

export const getNewCount = (startF, endF, recurringsize) =>{
    switch(recurringsize){
        case "daily":
            return (endF.diff(startF, 'days'));
        case "weekly":
            return endF.diff(startF, 'weeks');
        case "biweekly":
            return Math.floor((endF.diff(startF, 'weeks'))/2) ;
        case "monthly":
            return (endF.diff(startF, 'month'));
        default:
            return 1;
    }
};