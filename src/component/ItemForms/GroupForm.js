import React from 'react';
import { connect } from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback, InputGroup,  ListGroupItem, ListGroup} from 'reactstrap';
import { addGroup } from '../../Redux/Actions/Group';
import {GroupField} from '../.././Functions/Validation';
import GroupList from './GroupList';

class GroupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            invalid: false,
            error:''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.checkGroupName = this.checkGroupName.bind(this);
    }

    onSubmit = (e) =>{
        e.preventDefault();
        if(GroupField(this.state.value)){
            if(this.checkGroupName(this.state.value))
            {
                this.props.dispatch(addGroup({group: this.state.value}))
                this.setState({value: '', invalid: false, error : ""})
            }
            else
                this.setState({invalid: true, error : "Duplicate group name"})
        }
        else
            this.setState({invalid: true, error : "Invalid Char"})
    }

    checkGroupName=(name)=>{
        return !(this.props.groups.indexOf(name) > -1);
    }

    onGroupChange=(e)=>{
        const GroupName = e.target.value;    
        if(GroupName.length > 2)
            this.setState({value: GroupName, invalid: false, error:''})
        else{
            this.setState({value: GroupName, invalid: true, error:''})
        }
    }
    
    render= () =>(
        <div>
        <GroupList list={this.props.groups}/>
                <Col >
                <InputGroup>
                    <Input type="text" name="Group" id="Group" placeholder="New Group" value={this.state.value} invalid={this.state.invalid} 
                    onChange = {this.onGroupChange}/>
                    <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                    <FormFeedback>{this.state.error}</FormFeedback>
                </InputGroup>
                </Col>
        </div>
    );

}

const MapUserInfo=(state)=>{
    return{
        groups: state.group
    }
}

export default connect(MapUserInfo)(GroupForm);