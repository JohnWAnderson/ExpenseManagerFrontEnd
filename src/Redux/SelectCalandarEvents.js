import moment from 'moment';

export default (items, date) =>{
    let eventsList = []
    items.map((item)=>{
        let theDate = (moment(item.duedate));
        if(theDate.month() == date.getMonth() && item.recurring){
            console.log("yes");
        }
        else if(theDate.month() == date.getMonth()){
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

const getRecurring=()=>{

}