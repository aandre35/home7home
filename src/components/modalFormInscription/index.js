import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem,
  Form, FormGroup, Label, Input, Row, Col, FormText, Container } from 'reactstrap';
import axios from 'axios'

const API = require('../../API.js')

class FormInscription extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nom: '',
      prenom: '',
      mail: '',
      password: '',
      modal: false
    }
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      }
    )
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const utilisateur = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      mail: this.state.mail,
      password: this.state.password
    };
    console.log("Utilisateur envoyé: ")
    console.log(utilisateur)
    const url = `${API.urlUtilisateurs}${API.urlPost}`
    console.log(url)
    axios.post(url, utilisateur)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  setModal= () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    const {buttonLabel, className} = this.props
    const {nom, prenom, mail, password} = this.state;
    return (
      <>
        <DropdownItem onClick={this.setModal}>{buttonLabel}</DropdownItem>
        <Modal isOpen={this.state.modal} toggle={this.setModal} className={className}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.setModal}>{buttonLabel}</ModalHeader>
          <ModalBody>
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
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.setModal}>{buttonLabel}</Button>{' '}
            <Button color="secondary" onClick={this.setModal}>Annuler</Button>
          </ModalFooter>
          </Form>
        </Modal>        
      </>
    );
  }
}

export default FormInscription;