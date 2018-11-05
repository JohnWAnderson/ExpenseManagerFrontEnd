import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectCalendarEvents from '../../Redux/SelectCalendarEvents';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarInfo from './CalendarInformation';
import TheCalendar from './TheCalendar';
import { Container, Row, Col } from 'reactstrap';
import Media from "react-media";


 

class CalendarPage extends React.Component {
    constructor(props){
    super(props);
    const eventList = (SelectCalendarEvents(this.props.items, new Date()))
    this.state = {
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
        console.log();
        
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
            <Media query="(max-width: 1200px)">
                {matches =>
                matches ? (
                    <Container>
                    <Row><Col><CalendarInfo cost={this.state.cost} items={this.state.itemNum}/></Col></Row>
                    <Row><Col>                        
                    <TheCalendar  handleSelectEvent={this.handleSelectEvent}
                        events={this.state.events} onMonthChange={this.onMonthChange}
                    />   
                    </Col></Row>
                    </Container>
                ) : (
                    <Row>
                        <Col xs="6">               
                    <div>
                        <CalendarInfo cost={this.state.cost} items={this.state.itemNum}/>
                    </div></Col>
                        <Col xs="6">    
                        <TheCalendar  handleSelectEvent={this.handleSelectEvent}
                            events={this.state.events} onMonthChange={this.onMonthChange}
                        />
                        </Col>
                </Row>
                )
                }
            </Media>
            </Container>
        )
    };
}

const MapUserInfo=(state)=>{
    
    return{
        items: state.items
    }
  }
  export default connect(MapUserInfo)(CalendarPage);
