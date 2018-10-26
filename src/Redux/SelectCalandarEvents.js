import moment from 'moment';

export default (items, date) =>{
    let eventsList = []
    const mDate = (moment(date));
    items.map((item)=>{
        let theDate = (moment(item.duedate));
        if(item.recurring){
            if(theDate.month() === mDate.month()){
                if(item.enddate){
                    for (let m = moment(theDate); m.isSameOrBefore(item.endrecurring, 'day'); m =moment(m).add(1, 'days')) {
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
                    for (let m = moment(theDate); m.month()===mDate.month(); m =moment(m).add(1, 'days')) {
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
                        for (let m = moment(mDate).startOf('month'); m.isSameOrBefore(item.endrecurring, 'day'); m =moment(m).add(1, 'days')) {
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
                    for (let m = moment(mDate).startOf('month'); m.month()===mDate.month(); m =moment(m).add(1, 'days')) {
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
    return eventsList;
}
