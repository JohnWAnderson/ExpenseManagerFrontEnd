import React from 'react';
import { TaskNameAvailability } from '../ApiMethods/Account';
import {LoadingChange} from '../Redux/Actions/Loading';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import styled from 'styled-components';
import {ItemDisFeild, UserNameField} from '../Functions/Validation';

const ItemFormInput = styled.input`
    margin-bottom: 10px;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    font-size: 25px;
    min-width: 1200px;
    border: 1px solid black;   
`

const ItemFormTextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 25px;
    height: 100px;
    width: 100%;
    min-width: 1200px;
    border: 1px solid black;   
`

const ItemFormErrorTd = styled.td`
    text-align: left ;
    width: auto; height: auto;
    color: red;
    min-width: 200px;
`

const ItemFormDiv = styled.div`
    width: 80%;
    text-align: left;
    align: left;
    margin: auto;
    position: relative;
`
const ItemFormForm = styled.form`
    width: 100%;
    margin: auto;
    position: relative;
`

const ItemFormTable = styled.table`
    width: 100%;
    position: relative;
`

const ItemFormTBody = styled.tbody`
width: 100%;
position: relative;
`

const ItemFormTD = styled.td`
width: 90%;
position: relative;
`

const ItemFormButton = styled.button`
background-color: DodgerBlue;
border: none;
padding: 2px 2px;
margin-top: 10px;
font-size: 16px;
border-radius: 3px;
text-align: center;
align: center;
text-decoration: none;
font-size: 25px;

${({ clicked }) => clicked && `
background-color: DeepSkyBlue;
`}`

const ItemFormSelect = styled.select`
height: 50px;
font-size: 25px;
`

const ItemFormRecurring = styled.label`
margin-left: 150px;
font-size: 25px;
`

const ItemFormSingleDate = styled.label`
font-size: 25px;
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
                valid: true,
                error:''
            },
            duedate: props.item? moment(props.item.duedate) : moment().startOf('day'),
            recurring: props.item? props.item.recurring : false ,
            recurringsize: props.item? props.item.recurringsize : "none",
            enddate: props.item? props.item.enddate : false,
            endrecurring: (props.item && props.item.endrecurring!= null)  ? moment(props.item.endrecurring) : null,
            CalFocuse: false,
            RecFocuse: false,
            edit: props.item? true :false,
            old: props.item? props.item.name :'',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.HandlePropSubmit = this.HandlePropSubmit.bind(this);
    }

    onSubmit= (e) => {
        e.preventDefault();
        this.props.dispatch(LoadingChange({clicked: true}));
        if(this.state.name.valid && this.state.cost.valid && this.state.description.valid ){
            if(this.state.old === this.state.name.value){
                this.HandlePropSubmit();
            }
            else{
            TaskNameAvailability(this.state.name.value).then(response =>
                {            
                    if(response.available){
                        this.HandlePropSubmit();
                    }
                    else{
                        this.setState(() => ({name:{
                            value: this.state.name.value,
                            valid: false,
                            error:'Item name exists'
                        }}));
                        this.props.dispatch(LoadingChange({clicked: false}));
                    }
                });
            }    
        }
        else
        this.props.dispatch(LoadingChange({clicked: false}));
    }

    HandlePropSubmit= ()=>{
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

    NameChange = (e) =>{
        const name = e.target.value;
        if(name.length >2 && name.length <= 25){
            if(UserNameField(name)){        
                this.setState(() => ({name:{
                    value: name,
                    valid: true,
                    error:''
                }}));}
            else{
                this.setState(() => ({name:{
                    value: name,
                    valid: false,
                    error:'Invalid Character'
                }}));
            }
        }
        else{
            this.setState(() => ({name:{
                value: name,
                valid: false,
                error:'Invalid Length'
            }}));
        }
    }
    CostChange = (e) =>{
        const cost = e.target.value;
        if(cost < 0.00 || cost > 21474836.45){
            this.setState(() => ({cost: {
                value: cost,
                valid: false,
                error:'Number Size Invalid'
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
        if(description.length < 225){
            console.log('yes');
            if(ItemDisFeild(description)){
                this.setState(() => ({description:{
                    value: description,
                    valid: true,
                    error:''
                }}));}
            else{
                this.setState(() => ({description:{
                    value: description,
                    valid: false,
                    error:'Invalid Character'
                }}));
            }
        }
        else{
            console.log('no');
            this.setState(() => ({description:{
                value: description,
                valid: false,
                error:'Discription to long'
            }}));
        }
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
        <ItemFormDiv>
            <ItemFormForm  onSubmit= {this.onSubmit}>
            <ItemFormTable>
            <ItemFormTBody>
                <tr>
                <ItemFormTD>
                <ItemFormInput disabled={this.props.Loading.clicked} type = "text" placeholder="Name" name = "Name"  id="name" value = {this.state.name.value} onChange = {this.NameChange} required /> 
                </ItemFormTD>
                <ItemFormErrorTd>{!!this.state.name.error && this.state.name.error}</ItemFormErrorTd>
                </tr>
                <tr>
                <td>
                <ItemFormInput disabled={this.props.Loading.clicked} type = "number" placeholder="1.00" name = "Cost" id="cost" value = {this.state.cost.value} onChange = {this.CostChange} required/></td>
                <ItemFormErrorTd>{!!this.state.cost.error && this.state.cost.error}</ItemFormErrorTd>
                </tr>
                <tr>
                <td>
                <ItemFormTextArea disabled={this.props.Loading.clicked} type = "textarea" name = "Description"  id= "description" value = {this.state.description.value} onChange = {this.descriptionChange} placeholder="description (Optional)"/> </td> 
                <ItemFormErrorTd>{!!this.state.description.error && this.state.description.error}</ItemFormErrorTd>
                </tr>
                <tr>
                <td>
                <ItemFormSingleDate>Select Date: </ItemFormSingleDate>
                <SingleDatePicker disabled={this.props.Loading.clicked} date ={this.state.duedate} onDateChange={this.onDateChange} focused = {this.state.CalFocuse} onFocusChange={this.onFocusChange} numberOfMonths={1} isOutsideRange={()=> false}/> 
                <ItemFormRecurring>Is this a recurring date: </ItemFormRecurring>
                <ItemFormSelect disabled={this.props.Loading.clicked} value={this.state.recurring} onChange={(e) => {     
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
                </td>
                </tr>
                {this.state.recurring && <tr><td>
                    <ItemFormSingleDate >Select rate of recurrence:</ItemFormSingleDate>
                    <ItemFormSelect disabled={this.props.Loading.clicked} value={this.state.recurringsize} onChange={(e) => {     
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
                        <option value = 'daily'>daily</option>
                        <option value = 'weekly'>weekly</option>
                        <option value = 'biweekly'>bi-weekly</option>
                        <option value = 'monthly'>monthly</option>
                    </ItemFormSelect>
                    <ItemFormRecurring>Is there an end date for this item:</ItemFormRecurring>
                    <ItemFormSelect disabled={this.props.Loading.clicked} value={this.state.enddate} onChange={(e) => {     
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
                    </ItemFormSelect>
                </td></tr>}
                {(this.state.enddate && this.state.recurring) && 
                    <ItemFormSingleDate>Select End Date:</ItemFormSingleDate> }
                {(this.state.enddate && this.state.recurring) && 
                    <SingleDatePicker disabled={this.props.Loading.clicked} date ={this.state.endrecurring} onDateChange={this.onEndRecurringChange} focused = {this.state.RecFocuse} onFocusChange={this.onRecFocuseChange} numberOfMonths={1} isOutsideRange={()=> false}/> }
                </ItemFormTBody>
                </ItemFormTable>
                <ItemFormButton type="submit" value="Submit" clicked={this.props.Loading.clicked} disabled={this.props.Loading.clicked} className= "button">Submit</ItemFormButton>
            </ItemFormForm>
        </ItemFormDiv>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user.currentUser,
        filter: state.filter,
        Loading: state.loading
    }
  }

export default connect(MapUserInfo)(ItemForm);
