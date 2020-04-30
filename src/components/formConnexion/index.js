import React, { useState } from 'react';
import { Form, FormGroup, Label, Input} from 'reactstrap';

const Connexion = (props) => {
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
      </Form>
    </div>
  );
}

export default Connexion;