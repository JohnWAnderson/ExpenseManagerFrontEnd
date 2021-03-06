import React from 'react';
import { TaskNameAvailability } from '../../ApiMethods/Account';
import {LoadingChange} from '../../Redux/Actions/Loading';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import styled from 'styled-components';
import {ItemDisFeild} from '../../Functions/Validation';
import GroupModal from './GroupModal';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Col, InputGroupAddon, InputGroup} from 'reactstrap';

const MyLabel = styled(Label)`
    display:block;
    min-width:180px;
    max-width:200px;

    @media (min-width: 1330px) {
        text-align: right;
    }
`

const MyForm = styled(Form)`
    display:block;
    min-width:180px;
    text-align:left;
    align:left;
    margin: auto;
    padding: auto;


`
//1330
// /text-align:right;
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
            group:{
                value: props.item ? props.item.group : 'no',
                valid: props.item? true : false,
                error:''
            },
            duedate: props.item ? moment(props.item.duedate) : moment().startOf('day'),
            recurring: props.item ? props.item.recurring : false ,
            recurringsize: props.item ? props.item.recurringsize : "none",
            enddate: props.item ? props.item.enddate : false,
            endrecurring: (props.item && props.item.endrecurring!= null)  ? moment(props.item.endrecurring) : null,
            CalFocuse: false,
            RecFocuse: false,
            edit: props.item? true :false,
            old: props.item? props.item.name :'',

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.HandlePropSubmit = this.HandlePropSubmit.bind(this);
        this.onReccuringCost=this.onReccuringCost.bind(this);
        this.onRecurringSize = this.onRecurringSize.bind(this);
        this.onRecurringEnd = this.onRecurringEnd.bind(this);
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
            "group": this.state.group.value,
            "recurring": this.state.recurring,
            "recurringsize": this.state.recurringsize,
            "enddate": this.state.enddate,
            "endrecurring": (this.state.endrecurring === null)? null :this.state.endrecurring.format("YYYY-MM-DD")
        });
    }

    onReccuringCost=(e)=>{
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
    }

    onRecurringSize=(e)=>{
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
    }

    onRecurringEnd=(e)=>{
        if(e.target.value === 'true'){
            this.handleEndDateChange(true); 
            this.onEndRecurringChange(moment().add(1, 'M'))
        }
        else if(e.target.value === 'false'){
            this.handleEndDateChange(false);
            this.onEndRecurringChange(null)
        }
    }

    NameChange = (e) =>{
        const name = e.target.value;
        if(name.length >2 && name.length <= 22){
            if(ItemDisFeild(name)){        
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
            if(description.length === 0){
                this.setState(() => ({description:{
                    value: description,
                    valid: true,
                    error:''
                }}));
            }
            else{
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
        }
        else{
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

    onGroupChange=(e)=>{
        const groupName = e.target.value;
        //console.log(groupName);
        this.setState(() => ({group:{
            value: groupName,
            valid: true,
            error:''
        }}));
    }

    createSelectItems() {
        let items = []; 
        items.push(<option key="no"></option>)
        for (let group of this.props.groups) {             
            items.push(<option key={group} value={group}>{group}</option>);   
        }
        return items;
     }  

    render= () =>(
        <MyForm onSubmit={this.onSubmit}>

        <FormGroup row>
          <MyLabel for="name" sm={2}>Item Name</MyLabel>
          <Col sm={10}>
            <Input disabled={this.props.Loading.clicked} type = "text" placeholder="Name" name = "Name"  id="name" 
            value = {this.state.name.value} onChange = {this.NameChange} invalid = {!!this.state.name.error && !this.state.name.valid} required />
            <FormFeedback>{this.state.name.error}</FormFeedback>
          </Col>
        </FormGroup>

        <FormGroup row>
          <MyLabel for="cost" sm={2}>Cost</MyLabel>
          <Col sm={10}>
            <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input disabled={this.props.Loading.clicked} type = "number" placeholder="1.00" name = "Cost" id="cost" 
            value = {this.state.cost.value} onChange = {this.CostChange} invalid = {!!this.state.cost.error && !this.state.cost.valid} required/>
            <FormFeedback>{this.state.cost.error}</FormFeedback>
            </InputGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
            <MyLabel for="description" sm={2}>Description</MyLabel>
            <Col sm={10}>
                <Input type="textarea" disabled={this.props.Loading.clicked} name = "Description"  id= "description" 
                value = {this.state.description.value} onChange = {this.descriptionChange} placeholder="description (Optional)"
                invalid = {!!this.state.description.error && !this.state.description.valid}/>
                <FormFeedback>{this.state.description.error}</FormFeedback>
            </Col>
        </FormGroup>

        <FormGroup row>
            <MyLabel for="startdate" sm={2}>Start Date</MyLabel>
            <Col sm={10}>
                <SingleDatePicker id="startdate" disabled={this.props.Loading.clicked} date ={this.state.duedate} onDateChange={this.onDateChange} 
                focused = {this.state.CalFocuse} onFocusChange={this.onFocusChange} numberOfMonths={1} isOutsideRange={()=> false}/>
            </Col>
        </FormGroup>

        <FormGroup row>
            <MyLabel for="Group" sm={2}>Group Name</MyLabel>
            <Col sm={10}>
            <InputGroup>
            <Input type="select" name="Group" id="Group" disabled={this.props.Loading.clicked} value ={this.state.group.value}
                onChange={this.onGroupChange}>
                    {this.createSelectItems()}
            </Input>
            <GroupModal/>
            </InputGroup>
            </Col>
        </FormGroup>

        <FormGroup row>
          <MyLabel for="ReccuringSelect" sm={2}>Reccuring Cost</MyLabel>
          <Col sm={10}>
            <Input type="select" name="ReccuringSelect" id="ReccuringSelect" disabled={this.props.Loading.clicked} value={this.state.recurring}
            onChange={this.onReccuringCost}>
                <option value='true'>yes</option>
                <option value = 'false'>no</option>
            </Input>
          </Col>
        </FormGroup>
        
        {this.state.recurring &&
        <div>
            <FormGroup row>
                <MyLabel for="Recurrence" sm={2}>Recurrence Type</MyLabel>
                <Col sm={10}>
                <Input type="select" name="Recurrence" id="Recurrence" disabled={this.props.Loading.clicked} value={this.state.recurringsize}
                onChange={this.onRecurringSize}>
                    <option value = 'daily'>daily</option>
                    <option value = 'weekly'>weekly</option>
                    <option value = 'biweekly'>bi-weekly</option>
                    <option value = 'monthly'>monthly (date)</option>
                </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
            <MyLabel for="recurringEnd" sm={2}>Does Recurrence End</MyLabel>
            <Col sm={10}>
            <Input type="select" name="recurringEnd" id="recurringEnd" disabled={this.props.Loading.clicked} value={this.state.enddate}
            onChange={this.onRecurringEnd}>
                <option value = 'false'>no</option>
                <option value='true'>yes</option>
            </Input>
            </Col>
            </FormGroup>
            
            {(this.state.enddate && this.state.recurring) &&
                <div>
                <FormGroup row>
                    <MyLabel for="enddate" sm={2}>Select End Date</MyLabel>
                    <Col sm={10}>
                        <SingleDatePicker id="enddate" disabled={this.props.Loading.clicked} date ={this.state.endrecurring} onDateChange={this.onEndRecurringChange} 
                        focused = {this.state.RecFocuse} onFocusChange={this.onRecFocuseChange} numberOfMonths={1} isOutsideRange={()=> false}/>
                    </Col>
                </FormGroup>
                </div>
            }
        </div>
        }
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </MyForm>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user.currentUser,
        filter: state.filter,
        Loading: state.loading,
        groups: state.group

    }
  }

export default connect(MapUserInfo)(ItemForm);
