import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel, 
    className,
    children
  } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <DropdownItem onClick={toggle}>{buttonLabel}</DropdownItem>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{buttonLabel}</ModalHeader>
        <ModalBody>
          <Form>
            {children}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>{buttonLabel}</Button>{' '}
          <Button color="secondary" onClick={toggle}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;