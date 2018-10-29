import moment from 'moment';

export default (items, date) =>{
    let eventsList = []
    let cost = 0;
    let itemNumber = 0;
    const mDate = (moment(date));
    console.log(date);
    console.log(items);
    items.map((item)=>{
        let theDate = (moment(item.duedate));
        if(item.recurring){
            if(theDate.month() === mDate.month()){
                if(item.enddate){
                    itemNumber = itemNumber + 1;
                    for (let m = moment(theDate); m.isSameOrBefore(item.endrecurring, 'day'); m =moment(m).add(1, 'days')) {
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
                    for (let m = moment(theDate); m.month()===mDate.month(); m =moment(m).add(1, 'days')) {
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
                        for (let m = moment(mDate).startOf('month'); m.isSameOrBefore(item.endrecurring, 'day'); m =moment(m).add(1, 'days')) {
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
                    for (let m = moment(mDate).startOf('month'); m.month()===mDate.month(); m =moment(m).add(1, 'days')) {
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
