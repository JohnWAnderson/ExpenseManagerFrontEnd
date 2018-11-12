import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { editItem } from '../../Redux/Actions/Items';
import {TimesItemChange} from '../../Redux/TimesChange';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';
import QuarterButton from './QuarterButton';
import GetFirstQuarter from '../../Redux/GetFirstQuarter';

class FilterPicker extends React.Component{
    constructor(props){
        super(props);    
        this.TimesAmountChange= this.TimesAmountChange.bind(this);
        this.setQuarterButtons=this.setQuarterButtons.bind(this);
        this.TimesAmountChange(props.qFilter.StartDate, props.qFilter.EndDate)
        this.state={
            CalFocuse: null,
            quaters: this.setQuarterButtons(GetFirstQuarter(props.items))
        };
        console.log(props.items);
    }

    TimesAmountChange = (startDate, endDate) =>{
        for(const item of this.props.items){
            this.props.dispatch(editItem(item.name, {qTimes: TimesItemChange(item, startDate, endDate)}));
        }
    };

    setQuarterButtons=(date)=>{
        let quaters=[];
        let yearF = date.year();
        let quaterF = date.quarter();
        const year = moment().year();
        const quater = moment().quarter();
        while(yearF <= year && quaterF <= quater){
            quaters.push([yearF, quaterF])
            if(quaterF===4){
                quaterF = 0;
                yearF = yearF+1;
            }
            else{
                quaterF = quaterF + 1;
            }
       }  
       return quaters;
    }


    render(){     
        return(
            <Container>
            <Row>
            <Col><h1>Quarter Selection</h1></Col>
            </Row>
            <Row>
                <Container>
                    { (this.state.quaters.length > 0) ?
                        this.state.quaters.map((item)=>{
                        const key = `${item[0]} Q${item[1]}`;
                        return(<QuarterButton key={key} item={item}/>)})
                        :
                        <button>none</button>
                    }
                </Container>
            </Row>
            </Container>
        );
    };
}

const MapUserInfo=(state)=>{
    return{
        qFilter: state.qFilter,
        items: state.items
    }
}

export default connect(MapUserInfo)(FilterPicker);