import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Signup from './Signup';
import styled from 'styled-components';
import { connect } from 'react-redux';

const MenuModalButton = styled(Button)`
    font-size: 20px;
    position: relative;
    vertical-align: middle;
    height: 100%;
    margin: 10px;
`

class SignupModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    
  }

  render() {
    return (
      <div>
        <MenuModalButton color="primary" onClick={this.props.signOpenToggle} disabled={this.props.Loading.clicked} >Sign Up</MenuModalButton>
        <Modal isOpen={this.props.signOpen} toggle={this.props.signOpenToggle} className={this.props.className}>
          <ModalHeader toggle={this.props.signOpenToggle}>Sign Up</ModalHeader>
          <ModalBody>
            <Signup toggle={this.props.signOpenToggle} handleLogOn ={this.props.handleLogOn}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const MapUserInfo=(state)=>{
  return{
      Loading: state.loading
  }
}

export default connect(MapUserInfo)(SignupModal);