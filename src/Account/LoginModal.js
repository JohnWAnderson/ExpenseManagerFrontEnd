import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Login from './Login';

class LoginModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    console.log(props);
    
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <Login toggle={this.toggle} handleLogOn ={this.props.handleLogOn}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;