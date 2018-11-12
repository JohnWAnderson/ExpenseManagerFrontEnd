import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import GroupForm from './GroupForm';

class GroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

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
        <Button color="success" onClick={this.toggle}>Add Group</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className='name'>
          <ModalHeader toggle={this.toggle}>Expense Groups</ModalHeader>
          <ModalBody>
            <GroupForm toggle={this.toggle}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


export default GroupModal;
