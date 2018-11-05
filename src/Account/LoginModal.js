import React from 'react';
import { Button, Modal, ModalHeader, ModalBody,ModalFooter } from 'reactstrap';
import Login from './Login';
import { connect } from 'react-redux';

class LoginModal  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.logOpenToggle();
    this.props.signOpenToggle();
  }



  render() {
    return (
      <div>
        <Button onClick={this.props.logOpenToggle}>Login</Button>
        <Modal isOpen={this.props.logOpen} toggle={this.props.logOpenToggle} className={this.props.className}>
          <ModalHeader toggle={this.props.logOpenToggle}>Login</ModalHeader>
          <ModalBody>
            <Login toggle={this.props.logOpenToggle} handleLogOn ={this.props.handleLogOn}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle} disabled={this.props.Loading.clicked}>SingUp</Button>{' '}
          </ModalFooter>
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

export default connect(MapUserInfo)(LoginModal);
