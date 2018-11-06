import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Signup from './Signup';
import styled from 'styled-components';

const SignupButton = styled(Button)`
  background: #3263A4;
  color: #3263A4;
  background-color:  #3263A4;
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
        <SignupButton color="primary" onClick={this.props.signOpenToggle}>Sign Up</SignupButton>
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

export default SignupModal;