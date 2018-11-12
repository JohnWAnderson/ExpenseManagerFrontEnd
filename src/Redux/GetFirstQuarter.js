import moment from 'moment';

export default (items) =>{
    let date = moment();
    for(const item of items){
        let tempDate = moment(item.duedate);
        if(date.isAfter(tempDate)){
            date = tempDate;
        }
        else{
        }
    }
    return date;
}