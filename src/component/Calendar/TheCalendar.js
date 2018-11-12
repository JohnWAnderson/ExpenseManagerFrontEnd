import React from 'react';
// import CustomToolbar from './CustomToolbar';
// import CustomEvent from './CustomEvent';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class TheCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            localizer: BigCalendar.momentLocalizer(moment)
        }
    }
    render() {
        return(
            <BigCalendar
                onSelectEvent={this.props.handleSelectEvent} 
                localizer={this.state.localizer}
                defaultView="month"
                views={['month','day']}
                events={this.props.events}
                style={{ height: "550px", width:"100%", align: "center", position: "relative"}}
                onNavigate={(date) => {this.props.onMonthChange(date)}}
            />       
        )
    }
}


export default TheCalendar;