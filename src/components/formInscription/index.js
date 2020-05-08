import React, { useState, Component } from 'react';
import { Form, FormGroup, Label, Input, Row, Col, FormText, Button } from 'reactstrap';
import axios from 'axios'

class Inscription extends Component {

  state = {
    nom: '',
    prenom: '',
    mail: '',
    password: '',
  }
  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleSubmit = event => {
    event.preventDefault();

    {/*
    const utilisateur = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.mail,
      password: this.state.password
    };
  */}
    const utilisateur = this.state
    console.log(utilisateur)
    
    axios.post(`http://localhost:8080/utilisateurs`, { utilisateur })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    console.log(this.state);
    const {nom, prenom, mail, password} = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col >
              <FormGroup>
                <Label for="exampleAddress">Nom</Label>
                <Input 
                  type="text" 
                  name="nom"  
                  value={nom}
                  placeholder="nom" 
                  onChange={this.handleChange}
                />
              </FormGroup>   
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleAddress">Prénom</Label>
                <Input 
                  type="text" 
                  name="prenom" 
                  value={prenom}
                  placeholder="prénom" 
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input 
                  type="email" 
                  name="mail" 
                  value ={mail}
                  placeholder="email" 
                  onChange={this.handleChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input 
                  type="password" 
                  name="password" 
                  value={password}
                  placeholder="password" 
                  onChange={this.handleChange} />
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
          <FormGroup check >
            <Label check>
              <Input type="checkbox" />{' '}
              J'accepte les condtions d'utilisation
            </Label>
            <Button olor="primary" type="submit">S'inscrire</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Inscription;