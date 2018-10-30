import moment from 'moment';

export default (items, date) =>{
    let eventsList = []
    let cost = 0;
    let itemNumber = 0;
    const mDate = (moment(date));
    items.map((item)=>{
        let theDate = (moment(item.duedate));
        if(item.recurring){
            if(theDate.month() === mDate.month()){
                if(item.enddate){
                    itemNumber = itemNumber + 1;
                    for (let m = moment(theDate); m.isSameOrBefore(item.endrecurring, 'day'); m = AddDates(item.recurringsize, m)) {
                        cost = cost + item.cost;
                        eventsList=[
                            ...eventsList,
                            {
                                start: moment(m.format('YYYY-MM-DD')),
                                end: moment(m.format('YYYY-MM-DD')),
                                title: item.name
                            }
                        ]
                    }
                }
                else{
                    itemNumber = itemNumber + 1;
                    for (let m = moment(theDate); m.month()===mDate.month(); m = AddDates(item.recurringsize, m)) {
                        cost = cost + item.cost;
                        eventsList=[
                            ...eventsList,
                            {
                                start: moment(m.format('YYYY-MM-DD')),
                                end: moment(m.format('YYYY-MM-DD')),
                                title: item.name
                            }
                        ]
                    }
                }
            }
            else if(theDate.isBefore(mDate, 'month')){
                if(item.enddate){
                    if(moment(item.endrecurring).isSameOrAfter(mDate, 'month')){
                        itemNumber = itemNumber + 1;
                        for (let m = CheckStartDate(item.recurringsize, theDate, moment(mDate).startOf('month')); m.isSameOrBefore(item.endrecurring, 'day'); m = AddDates(item.recurringsize, m)) {
                            cost = cost + item.cost;
                            eventsList=[
                                ...eventsList,
                                {
                                    start: moment(m.format('YYYY-MM-DD')),
                                    end: moment(m.format('YYYY-MM-DD')),
                                    title: item.name
                                }
                            ]
                        }
                    }
                }
                else{
                    itemNumber = itemNumber + 1;
                    for (let m = CheckStartDate(item.recurringsize, theDate, moment(mDate).startOf('month')); m.month()===mDate.month(); m = AddDates(item.recurringsize, m)) {
                        cost = cost + item.cost;
                        eventsList=[
                            ...eventsList,
                            {
                                start: moment(m.format('YYYY-MM-DD')),
                                end: moment(m.format('YYYY-MM-DD')),
                                title: item.name
                            }
                        ]
                    }
                }
            }
        }
        else if(theDate.month() === mDate.month()){
            cost = cost + item.cost;
            itemNumber = itemNumber + 1;
            eventsList=[
                ...eventsList,
                {
                    start: theDate,
                    end: theDate,
                    title: item.name
                }
            ]
        }
    });
    return [eventsList,cost, itemNumber];
}


const AddDates = (recurringsize ,date)=>{
    switch(recurringsize){
        case 'daily':
            return moment(date).add(1, 'days');
        case 'weekly':
            return moment(date).add(1, 'weeks');
        case 'biweekly':        
            return moment(date).add(2, 'weeks');
        case 'monthly':   
            return moment(date).add(1, 'M');
        default:
            return moment(date).add(1, 'days');
    }
}

const CheckStartDate = (recurringsize ,date, mDate)=>{
    switch(recurringsize){
        case 'daily':
            return mDate;
        case 'weekly':
            return LoopForDate('weekly', date, mDate);
        case 'biweekly':        
            return LoopForDate('biweekly', date, mDate);
        case 'monthly':   
            return LoopForDate('monthly', date, mDate);
        default:
            return mDate;
    }
}

const getMonthly = (day)=>{

}

const LoopForDate = (recurringsize, date, mDate)=>{
    let m= null;
    for(m = moment(date); m.month()!== mDate.month(); m = AddDates(recurringsize, m)){
    }
    return m;
}

