import React, { Children } from 'react'
import {Card, CardBody, CardHeader, Label, FormGroup, Form, Input} from 'reactstrap'

const CardTag = (props) => {
  console.log(props.titre)
  return(
    <Card className="mb-2">
      <CardHeader>
        <h6>{props.title}</h6>
      </CardHeader>
      <CardBody>
        {props.children}
      </CardBody>              
    </Card>
  );
}

export default CardTag