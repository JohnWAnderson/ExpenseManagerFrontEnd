import React from 'react';
import Calendar from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectCalendarEvents from '../Redux/SelectCalandarEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const ItemListDiv = styled.div`
    padding: 0;
    text-align: center;
    align: center;
    position: relative;
    border-bottom: none;
    width: 70%;
    min-width: 750px;
    margin auto;
`

class CalendarPage extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        localizer: Calendar.momentLocalizer(moment),
        currentDate: new Date(),
        events: SelectCalendarEvents(this.props.items, new Date())
      };
      this.onMonthChange = this.onMonthChange.bind(this);
      this.handleSelectEvent = this.handleSelectEvent.bind(this);
      this.getindexID = this.getindexID.bind(this);
      console.log(this.props);
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
            <ItemListDiv>
            <Calendar
                onSelectEvent={this.handleSelectEvent} 
                localizer={this.state.localizer}
                defaultView="month"
                views={['month']}
                events={this.state.events}
                style={{ height: "80vh", width: "100vh", align: "center", position: "relative"}}
                onNavigate={(date) => {this.onMonthChange(date)}}
            />
            </ItemListDiv>
        )
    };
}

const MapUserInfo=(state)=>{
    return{
        items: state.items
    }
  }
  export default connect(MapUserInfo)(CalendarPage);