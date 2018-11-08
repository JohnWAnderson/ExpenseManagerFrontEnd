import React from 'react';
import styled from 'styled-components';
import {Container, Row, Col } from 'reactstrap';
import { RandomColor } from './MapAnalyticsData';
import {Doughnut} from 'react-chartjs-2';
import getVisableItem from '../../Redux/SelectorItemOrder';
import { connect } from 'react-redux';

class AnalyticsPieGraph extends React.Component{
    constructor(props){
        super(props);
        this.ChangeData = this.ChangeData.bind(this);
        this.MakeData=this.MakeData.bind(this);
        this.state={
            data:  this.ChangeData(props.itemsV)
        }
    }
 
    ChangeData=(items)=>{
        const data = {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [{
              backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                "#34495e"
              ],
              data: [12, 19, 3, 17, 28, 24, 7]
            }]
          };

          console.log('here');
          console.log(items);
          console.log(this.MakeData(items));

        return this.MakeData(items);
    }

    MakeData=(items)=>{
        // let data ={
        //     labels: [],
        //     datasets: [{
        //       backgroundColor: [],
        //       data: []
        //     }]
        //   };
        let labels =[];
        let backgroundColor = [];
        let data = [];
        items.map((item)=>{
            console.log(item);
            
            labels = [...labels, item.name];
            backgroundColor = [...backgroundColor, RandomColor()];
            data = [...data , ((item.cost * item.qTimes)/100)];
          })
        
        return {labels: labels, datasets:[{backgroundColor: backgroundColor, data:data}]}  
    }
    

    render(){
        return(
        <Container>
            <Row>
                <Col>
                    <Doughnut data={this.state.data}/>
                </Col>
            </Row>
        </Container>
        );
    }
}
   
// <Doughnut data={}/>
   const MapInfo=(state)=>{
    return{       
        itemsV: getVisableItem(state.items, {name:'', sortby:'cost', startDate:state.qFilter.StartDate , endDate: state.qFilter.EndDate})
    }
}

export default connect(MapInfo)(AnalyticsPieGraph);
