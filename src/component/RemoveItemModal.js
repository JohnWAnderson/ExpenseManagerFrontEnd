import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

const RemoveItemDiv = styled.div`
margin-bottom: 10px;
`

class RemoveItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    console.log(props);
    
    this.ToggleYes = this.ToggleYes.bind(this);
    this.ToggleNo = this.ToggleNo.bind(this);
  }

  ToggleYes() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.RemoveItem(this.props.item);
  }

  ToggleNo() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <RemoveItemDiv>
        <Button color="danger" onClick={this.ToggleNo}>Remove</Button>
        <Modal isOpen={this.state.modal} toggle={this.ToggleNo} className={this.props.className}>
          <ModalHeader toggle={this.ToggleNo}>Modal title</ModalHeader>
          <ModalBody>
          Would You like to remove this item
         </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.ToggleYes}>Are you sure you want to delete {} </Button>
            <Button color="secondary" onClick={this.ToggleNo}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </RemoveItemDiv>
    );
  }
}

export default RemoveItemModal;