import React from 'react';
import { TaskNameAvailability } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import styled from 'styled-components';

const SignUpInput = styled.input`
    margin-bottom: 10px;
    padding: 2px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    height: 30px;
    width: 250px;
`

const ItemFormSelect = styled.select`
`

class ItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:{
                value: props.item? props.item.name :'',
                valid: props.item? true :false,
                error:''
            },
            cost:{
                value: props.item? props.item.cost/ 100 :'',
                valid: props.item? true :false,
                error:''
            },
            description:{
                value: props.item? props.item.description :'',
                valid: props.item? true :false,
                error:''
            },
            duedate: props.item? moment(props.item.duedate) : moment().startOf('day'),
            recurring: props.item? props.item.recurring : false ,
            recurringsize: props.item? props.item.recurringsize : "none",
            enddate: props.item? props.item.enddate : false,
            endrecurring: (props.item && props.item.endrecurring!= null)  ? moment(props.item.endrecurring) : null,
            CalFocuse: false,
            RecFocuse: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        console.log(this.state);
        
    }

    onSubmit= (e) => {
        e.preventDefault();         
        if(this.state.name.valid || this.state.cost.valid || !!this.state.description.value){
            this.props.onSubmit ({
                "name":  this.state.name.value,
                "cost": this.state.cost.value*100,
                "description":this.state.description.value,
                "userName": this.props.User.username,
                "duedate": this.state.duedate.format("YYYY-MM-DD"),
                "recurring": this.state.recurring,
                "recurringsize": this.state.recurringsize,
                "enddate": this.state.enddate,
                "endrecurring": (this.state.endrecurring === null)? null :this.state.endrecurring.format("YYYY-MM-DD")
            });
        }
    }

    NameChange = (e) =>{
        const name = e.target.value;
        if(name.length >2){
            TaskNameAvailability(name).then(response =>
                {                  
                    if(response.available){
                        this.setState(() => ({name:{
                            value: name,
                            valid: true,
                            error: ''
                        }}));
                    }
                    else{
                        this.setState(() => ({name:{
                            value: name,
                            valid: false,
                            error:'You already have a Task with this name'
                        }}));
                    }

                });

        }
        else{
            this.setState(() => ({name:{
                value: name,
                valid: false,
                error:'Must be Length 3'
            }}));
        }
    }
    2147483647
    CostChange = (e) =>{
        const cost = e.target.value;
        if(cost < 0.00 || cost > 21474836.45){
            this.setState(() => ({cost: {
                value: cost,
                valid: false,
                error:'Number size invalid'
            }}));           
        }
        else if(!cost || cost.match(/^\d{1,}(\.\d{0,2})?$/))
            this.setState(() => ({cost: {
                value: cost,
                valid: true,
                error:''
            }}));
        else{
        }
    }

    descriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(() => ({description:{
            value: description
        }}));
    }

    onDateChange= (duedate)=>{
        this.setState(()=>({
            duedate: duedate
        }))
    };

    onFocusChange=(focused)=>{
        this.setState(()=>({
            CalFocuse: focused.focused
        }))
    }

    handleRecurringChange=(recurring)=>{
        this.setState(()=>({recurring}))
    }

    handlerecurringsizeChange=(recurringsize)=>{
        this.setState(()=>({recurringsize}))
    }

    onEndRecurringChange = (endrecurring)=>{
        this.setState(()=>({
            endrecurring: endrecurring
        }))
    }

    onRecFocuseChange = (focused)=>{
        this.setState(()=>({
            RecFocuse: focused.focused
        }))
    }

    handleEndDateChange = (enddate) =>{
        this.setState(()=>({enddate}))
    }

    render= () =>(
        <div>
            <form  onSubmit= {this.onSubmit}>
            <label >Name:  </label>
            <SignUpInput type = "text" placeholder="Name" name = "Name"  id="name" value = {this.state.name.value} onChange = {this.NameChange} /> 
            {!!this.state.name.error && this.state.name.error}
            <br/>
            <label >Cost: $</label>
            <SignUpInput type = "number" placeholder="1.00" name = "Cost" id="cost" value = {this.state.cost.value} onChange = {this.CostChange} />
            {!!this.state.cost.error && this.state.cost.error}
            <br/>
            <label >Note:  </label>
            <SignUpInput type = "text" name = "Description"  id= "description" value = {this.state.description.value} onChange = {this.descriptionChange} placeholder="description (Optional)"/>  
            <br/>
            <SingleDatePicker date ={this.state.duedate} onDateChange={this.onDateChange} focused = {this.state.CalFocuse} onFocusChange={this.onFocusChange} numberOfMonths={1} isOutsideRange={()=> false}/>    
            <br/>   
            <label >Is this cost Recurring:</label>
            <ItemFormSelect value={this.state.recurring} onChange={(e) => {     
                if(e.target.value === 'true'){
                    this.handleRecurringChange(true);
                    if(this.state.recurringsize)
                        this.handlerecurringsizeChange('daily');
                }
                else if(e.target.value === 'false'){
                    this.handleRecurringChange(false);
                    this.handlerecurringsizeChange('none');
                    this.onEndRecurringChange(null);
                    this.handleEndDateChange(false);
                }
            }}>>
                <option value='true'>yes</option>
                <option value = 'false'>no</option>
            </ItemFormSelect>
            {this.state.recurring && <div> 
                <label >Select rate of recurrence:</label>
                <select value={this.state.recurringsize} onChange={(e) => {     
                    if(e.target.value === 'weekly')
                        this.handlerecurringsizeChange('weekly');                 
                    else if(e.target.value === 'biweekly')
                        this.handlerecurringsizeChange('biweekly');
                    else if(e.target.value === 'monthly')
                        this.handlerecurringsizeChange('monthly');
                    else if(e.target.value === 'daily')
                        this.handlerecurringsizeChange('daily');
                    else
                        this.handlerecurringsizeChange('daily');//will change for error handling
                }}>>
                    <option value = 'Select Type:'>Select Type:</option>
                    <option value = 'daily'>daily</option>
                    <option value = 'weekly'>weekly</option>
                    <option value = 'biweekly'>bi-weekly</option>
                    <option value = 'monthly'>monthly</option>
                </select>
                <br/>
                <label>Is there an end date for this item:</label>
                <select value={this.state.enddate} onChange={(e) => {     
                    if(e.target.value === 'true'){
                        this.handleEndDateChange(true); 
                        this.onEndRecurringChange(moment().add(1, 'M'))
                    }
                    else if(e.target.value === 'false'){
                        this.handleEndDateChange(false);
                        this.onEndRecurringChange(null)
                    }
                }}>>
                    <option value = 'false'>no</option>
                    <option value='true'>yes</option>
                </select>
                {this.state.enddate && 
                    <SingleDatePicker date ={this.state.endrecurring} onDateChange={this.onEndRecurringChange} focused = {this.state.RecFocuse} onFocusChange={this.onRecFocuseChange} numberOfMonths={1} isOutsideRange={()=> false}/> }    
                </div>}
            <br/>
            <button className= "button">Submit</button>
            </form>
        </div>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user.currentUser
    }
  }

export default connect(MapUserInfo)(ItemForm);
