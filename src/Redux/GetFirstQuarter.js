import moment from 'moment';

export default (items) =>{
    let date = moment();
    for(const item of items){
        console.log(item.duedate)
        let tempDate = moment(item.duedate);
        if(date.isAfter(tempDate)){
            console.log('before');
            date = tempDate;
        }
        else{
            console.log('after');
        }
    }
}