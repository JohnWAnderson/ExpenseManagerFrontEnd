import getVisableItem from './SelectorItemOrder';


export default (items, {name, sortby, startDate, endDate}) =>{
    let GroupList = new Map();
    const ItemList = getVisableItem(items, {name, sortby, startDate, endDate})
    for (let i = 0; i < ItemList.length; i++){
        let item = ItemList[i];
        if(item.group !=='no'){
            if(GroupList.has(item.group))
                GroupList.set(item.group, item.cost * item.qTimes + GroupList.get(item.group));
            else
                GroupList.set(item.group, item.cost * item.qTimes);
        }
    }
    return GroupList;
}