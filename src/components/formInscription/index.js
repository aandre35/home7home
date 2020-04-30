/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem} from 'reactstrap';
import { Form, FormGroup, Label, Input, Row, Col, FormText } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className, 
    children
  } = props;
  console.log(children)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Form row>
        <Row>
          <Col >
            <FormGroup>
              <Label for="exampleAddress">Nom</Label>
              <Input type="text" name="nom" id="exampleAddress" placeholder="prenom"/>
            </FormGroup>   
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleAddress">Prénom</Label>
              <Input type="text" name="prenom" id="exampleAddress" placeholder="nom"/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="email" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="password" />
            </FormGroup>         
          </Col>
        </Row>   
        <FormGroup>
          <Label for="exampleFile">Photo</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
           formtas acceptés : ...
          </FormText>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            J'accepte les condtions d'utilisation
          </Label>
        </FormGroup>
      </Form>
    </div>
  );
}

export default ModalExample;