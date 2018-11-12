import React from 'react';
import { Button} from 'reactstrap';
import { connect } from 'react-redux';
import {setStartDateQ, setEndDateQ} from '../../Redux/Actions/QFilter';
import {TimesItemChange} from '../../Redux/TimesChange';
import { editItem } from '../../Redux/Actions/Items';
import moment from 'moment';

class QuarterButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            key: `${props.item[0]} Q${props.item[1]}`,
            item: props.item
        };
        this.hanndleClick=this.hanndleClick.bind(this);
        this.TimesAmountChange = this.TimesAmountChange.bind(this);
    }

    hanndleClick=()=>{
        const newDate = moment().year(this.state.item[0]).quarter(this.state.item[1]);
        const startDate = moment(newDate).startOf('quarter')
        const endDate =moment(newDate).endOf('quarter')
        this.props.dispatch(setStartDateQ(startDate));
        this.props.dispatch(setEndDateQ(endDate));
        this.TimesAmountChange(startDate, endDate);
    }

    TimesAmountChange = (startDate, endDate) =>{
        this.props.items.map((item)=>{
            this.props.dispatch(editItem(item.name, {qTimes: TimesItemChange(item, startDate, endDate)}));
        })
    };

    render() {    
        return(
        <Button onClick={this.hanndleClick}>
            {this.state.key}
        </Button>
        )
    }
}

const MapInfo=(state)=>{
    return{       
        qFilter: state.qFilter,
        items: state.items
    }
}

export default connect(MapInfo)(QuarterButton);
