import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {setEndDate, setStartDate} from '../Redux/Actions/Filter';
import { editItem } from '../Redux/Actions/Items';
import {TimesItemChange} from '../Redux/TimesChange';
import styled from 'styled-components';
import moment from 'moment';
import { Container, Row, Col } from 'reactstrap';

const PageInfoRow = styled(Row)`
    color: black;
    text-decoration: none;
    font-family: Georgia;
    font-size: 20px;
    position: relative;
    vertical-align: middle;
    text-align:center;
`

class FilterPicker extends React.Component{
    constructor(props){
        super(props);    
        this.state={
            CalFocuse: null
        };
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.TimesAmountChange = this.TimesAmountChange.bind(this);
        this.onDatesDelete = this.onDatesDelete.bind(this);
    }

    onDatesChange = ({startDate, endDate}) => {
        console.log(startDate, endDate);
        if((startDate !==null) && (endDate!==null)){
            this.props.dispatch(setStartDate(startDate));
            this.props.dispatch(setEndDate(endDate));
            this.TimesAmountChange(startDate, endDate);
        }
        else
        {
            this.onDatesDelete();
        }
    };

    onDatesDelete = ()=>{
        this.props.dispatch(setStartDate(moment().startOf('month')));
        this.props.dispatch(setEndDate(moment().endOf('month')));
    }

    TimesAmountChange = (startDate, endDate) =>{
        this.props.Items.map((item)=>{
            this.props.dispatch(editItem(item.name, {times: TimesItemChange(item, startDate, endDate)}));
        })
    };

    onFocusChange = (CalFocuse) =>{
        this.setState(()=>({CalFocuse}))
    };

    render(){     
        return(
            <Container>
                <PageInfoRow>
                <Col>
                <DateRangePicker 
                startDateId= "start"
                endDateId= "end"
                startDate={moment(this.props.Filter.startDate)}
                endDate={moment(this.props.Filter.endDate)}
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.CalFocuse}
                onFocusChange={this.onFocusChange}
                showClearDates={true}
                numberOfMonths={1} 
                isOutsideRange={()=> false}
                />
                </Col>
                </PageInfoRow>
            </Container>
        );
    };
}

const MapUserInfo=(state)=>{
    return{
        Filter: state.filter,
        Items: state.items
    }
}

export default connect(MapUserInfo)(FilterPicker);