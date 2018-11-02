import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectCalendarEvents from '../Redux/SelectCalendarEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarInfo from './CalendarInformation';
import { Container, Row, Col } from 'reactstrap';

const CalenderPageDiv = styled.div`
    padding: 0;
    margin: 0;
    align: center;
    text-align: center;
    position: relative;
    width:100%;
    min-width: 900px;
    min-height: 92%;
`
const CalendarInformation = styled.div`
    max-width: 850px;
    min-width: 350px;
    align: center;
    margin: auto;
    height: 100%;
    text-align: center ;
    position: relative;
    width:100%;
`   
const CalendarDiv = styled.div`
    min-width: 350px;
    max-width: 850px;
    width:50%;
    align: center;
    text-align: center ;
    position: relative;
    height: 100%;
    padding:0;
    margin:0;
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
            <Container>
            <Row>
                <Col xs="6">               
             <CalendarInformation>
                <CalendarInfo cost={this.state.cost} items={this.state.itemNum}/>
            </CalendarInformation></Col>
                <Col xs="6">                   
                <CalendarDiv>
                <BigCalendar
                    onSelectEvent={this.handleSelectEvent} 
                    localizer={this.state.localizer}
                    defaultView="month"
                    views={['month']}
                    events={this.state.events}
                    style={{ height: "550px", width:"100%", align: "center", position: "relative"}}
                    onNavigate={(date) => {this.onMonthChange(date)}}
                    components={{
                        toolbar: CustomToolbar,
                        event:CustomEvent
                    }}
                />
                </CalendarDiv></Col>
            </Row>
            </Container>
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

const EventButtonDiv = styled.div`
    width:100%;
    align: center;
    text-algin:center;
    position: relative;
    height: 19px;
    vertical-align: top;
    font-size:15px;
`    

class CustomEvent extends React.Component {
    constructor(props){
        super(props);  
    }
    render() {
      return (
        <EventButtonDiv>
            <div>{this.props.title}</div>
        </EventButtonDiv>
      );
    }
  }

const MapUserInfo=(state)=>{
    
    return{
        items: state.items
    }
  }
  export default connect(MapUserInfo)(CalendarPage);