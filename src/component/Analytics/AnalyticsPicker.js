import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {setEndDate, setStartDate} from '../../Redux/Actions/Filter';
import { editItem } from '../../Redux/Actions/Items';
import {TimesItemChange} from '../../Redux/TimesChange';
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
    margin-top: 10px;
    margin-bottom: 10px;
`

class FilterPicker extends React.Component{
    constructor(props){
        super(props);    
        this.state={
            CalFocuse: null
        };
        this.TimesAmountChange = this.TimesAmountChange.bind(this);
    }

    onDatesChange = ({startDate, endDate}) => {
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
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');
        this.props.dispatch(setStartDate(startOfMonth));
        this.props.dispatch(setEndDate(endOfMonth));
        this.TimesAmountChange(startOfMonth, endOfMonth);
    }

    TimesAmountChange = () =>{
        this.props.Items.map((item)=>{
            this.props.dispatch(editItem(item.name, {times: TimesItemChange(item, startDate, endDate)}));
        })
    };


    render(){     
        return(
            <Container>
                <Row>
                    <Col>
                        <button>quater</button>
                    </Col>
                </Row>
            </Container>
        );
    };
}

const MapUserInfo=(state)=>{
    return{
        qFilter: state.qFilter,
        Items: state.items
    }
}

export default connect(MapUserInfo)(FilterPicker);