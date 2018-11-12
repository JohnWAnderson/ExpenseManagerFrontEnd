import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import AnalyticsPieGraph from './AnalyticsPieGraph';
import AnalyticsPicker from './AnalyticsPicker';

class AnalyticsPage extends React.Component {
    constructor(props){
        super(props);
    }

    //                    <Col>Currently in {moment(this.props.qFilter.StartDate).quarter()}  quarter</Col>
    render() {      
        return(
            <Container>
                <Row>
                    <Col><AnalyticsPicker/></Col>
                    <Col><AnalyticsPieGraph/></Col>
                </Row>
            </Container>
        )
    }
}

const MapInfo=(state)=>{
    return{       
        qFilter: state.qFilter,
        items: state.items
    }
}

export default connect(MapInfo)(AnalyticsPage);
