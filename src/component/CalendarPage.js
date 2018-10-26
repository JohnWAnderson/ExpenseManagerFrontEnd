import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectCalendarEvents from '../Redux/SelectCalandarEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CalenderPageDiv = styled.div`
    padding: 0;
    display: block;
    align: center;
    position: relative;
    min-width: 1000px;
    margin: auto;
    min-height: 92%;
`
const CalendarInformation = styled.div`
    display: inline-block;
    vertical-align: top;
    align: left;
    width: 50%;
    height: 100%;
    text-align: left ;
    position=relative;
`   
const CalendarDiv = styled.div`
    min-width: 800px;
    display: inline-block;
    vertical-align: top;
    width: 50%;
    align: right;
    text-align: right ;
    position: relative;
    height: 100%;
`   

class CalendarPage extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        localizer: BigCalendar.momentLocalizer(moment),
        currentDate: new Date(),
        events: SelectCalendarEvents(this.props.items, new Date())
      };
      this.onMonthChange = this.onMonthChange.bind(this);
      this.handleSelectEvent = this.handleSelectEvent.bind(this);
      this.getindexID = this.getindexID.bind(this);
    }

    onMonthChange=(date)=>{
        this.setState({events: SelectCalendarEvents(this.props.items, date)});
    }

    handleSelectEvent(event,target) {
        this.props.history.push(`/edit/${this.getindexID(event.title)}`)  
    }

    getindexID=(name)=>{
        return this.props.items.map(item => item.name).indexOf(name)+1;
    }

    render() {
        return(
            <CalenderPageDiv>
            <CalendarDiv>
            <BigCalendar
                onSelectEvent={this.handleSelectEvent} 
                localizer={this.state.localizer}
                defaultView="month"
                views={['month']}
                events={this.state.events}
                style={{ height: "800px", width:"770px", align: "center", position: "relative", margin:"auto"}}
                onNavigate={(date) => {this.onMonthChange(date)}}
            />
            </CalendarDiv>
            <CalendarInformation>
            temp
            </CalendarInformation>
            </CalenderPageDiv>
        )
    };
}

const MapUserInfo=(state)=>{
    return{
        items: state.items
    }
  }
  export default connect(MapUserInfo)(CalendarPage);