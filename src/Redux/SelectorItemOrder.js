import moment from 'moment';

export default (items, {name, sortby, startDate, endDate}) =>{
    return items.filter((item) => { 
        const startF = moment(startDate);
        const endF =  moment(endDate);
        const DueDate = moment(item.duedate)
        let DueRecurring = null
        if(item.enddate )
            DueRecurring = moment(item.endrecurring);
        const recurringSDate = CheckRecurringSDate(startF, DueDate, item.recurring);
        const recurringEDate = CheckRecurringEDate(endF, DueRecurring, item.recurring);
        const startDateMatch = startDate ? startF.isSameOrBefore(DueDate, 'day') : true;
        const endDateMatch = endDate ? endF.isSameOrAfter(DueDate, 'day') : true;
        const nameMatch = item.name.toLowerCase().includes(name.toLowerCase());  
        const times = item.times > 0;
        return (startDateMatch || recurringSDate) && (endDateMatch || recurringEDate) && nameMatch && times;
        
    }).sort((a,b) => {
        if(sortby === 'cost'){
            return (a.cost*a.times) < (b.cost * b.times) ? 1 : -1;
        }
        else{
            return 0;
        }
    });
};

const CheckRecurringSDate=(startF, DueDate, recurring) =>{
    if(DueDate.isBefore(startF) && recurring)
        return true;
    return false
};

const CheckRecurringEDate=(endF, DueRecurring, recurring) =>{
    if(recurring && DueRecurring !== null)
        return endF.isBefore(DueRecurring) ? true : false;
    return false
};