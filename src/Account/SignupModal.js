import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Signup from './Signup';

class SignupModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    console.log(props);
    
    this.toggle = this.toggle.bind(this);
  }

  toggle() {

  }

  render() {
    return (
      <div>
        <Button onClick={this.props.signOpenToggle}>Sign Up</Button>
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