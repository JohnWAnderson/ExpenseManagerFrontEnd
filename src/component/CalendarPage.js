import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectCalendarEvents from '../Redux/SelectCalandarEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarInfo from './CalendarInformation';

const CalenderPageDiv = styled.div`
    padding: 0;
    align: center;
    text-align: center;
    flex-direction: column;
    position: relative;
    width:100%;
    min-height: 92%;
`
const CalendarInformation = styled.div`
    align: center;
    margin: auto;
    height: 100%;
    text-align: center ;
    position=relative;
    width:100%;
`   
const CalendarDiv = styled.div`
    min-width: 800px;
    margin: auto;
    width:100%;
    align: center;
    text-align: center ;
    position: relative;
    height: 100%;
`   

class CalendarPage extends React.Component {
    constructor(props){
    super(props);
    const eventList = (SelectCalendarEvents(this.props.items, new Date()))
    this.state = {
        localizer: BigCalendar.momentLocalizer(moment),
        currentDate: new Date(),
        events: eventList[0],
        cost: eventList[1],
        itemNum: eventList[2]
      };
      this.onMonthChange = this.onMonthChange.bind(this);
      this.handleSelectEvent = this.handleSelectEvent.bind(this);
      this.getindexID = this.getindexID.bind(this);
    }

    onMonthChange=(date)=>{
        const eventList = (SelectCalendarEvents(this.props.items, date))
        console.log(date);
        this.setState({events: eventList[0],
            cost: eventList[1],
            itemNum: eventList[2]});
    }
    
    handleSelectEvent(event) {
        this.props.history.push(`/edit/${this.getindexID(event.title)}`)  
    }

    getindexID=(name)=>{
        return this.props.items.map(item => item.name).indexOf(name)+1;
    }



    render() {
        return(
            <CalenderPageDiv>
                <CalendarInformation>
                    <CalendarInfo cost={this.state.cost} items={this.state.itemNum}/>
                </CalendarInformation>
                <CalendarDiv>
                <BigCalendar
                    onSelectEvent={this.handleSelectEvent} 
                    localizer={this.state.localizer}
                    defaultView="month"
                    views={['month']}
                    events={this.state.events}
                    style={{ height: "600px", width:"770px", align: "center", position: "relative", margin:"auto"}}
                    onNavigate={(date) => {this.onMonthChange(date)}}
                    components={{
                        toolbar: CustomToolbar
                    }}
                />
                </CalendarDiv>
            </CalenderPageDiv>
        )
    };
}

class CustomToolbar extends React.Component {

    render() {
        let navigate = {
        PREVIOUS: 'PREV',
        NEXT: 'NEXT',
        TODAY: 'TODAY',
        DATE: 'DATE',
        }
        let { localizer: { messages }, label } = this.props
        return(
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)}>Prev</button>
                </span>
                <span className="rbc-toolbar-label">{label}</span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>Next</button>
                </span>
            </div>
        )
    }
    navigate = action => {
        this.props.onNavigate(action)
    }
}

const MapUserInfo=(state)=>{
    return{
        items: state.items
    }
  }
  export default connect(MapUserInfo)(CalendarPage);