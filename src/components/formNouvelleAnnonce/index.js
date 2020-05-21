import React, { Component, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem,
  Form, FormGroup, Label, Input, Row, Col, FormText, Container } from 'reactstrap';
import axios from 'axios'

const API = require('../../API.js')

class FormInscription extends Component {

  constructor(props) {
    super(props)

    this.state = {
      titre: '',
      description: '',
      date: '',
      typeAnnonce: {},
      typesAnnonces: [],
      error: '',
    }
  }

  componentWillMount() {
    const url = `${API.urlTypesAnnonces}${API.urlGet}`
    axios.get(url)
    .then((response) =>{
      this.setState({
        typesAnnonces: response.data,
        typeAnnonce: response.data[0]
      })
    })
  }

  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      }
    )
    console.log(this.state)
  }

  getTypeAnnonce= (name) => {
    const typesAnnonces = this.state.typesAnnonces
    for (let i=0; i<typesAnnonces.length; i++) {
      if (typesAnnonces[i].type === name) {
        return typesAnnonces[i]
      }
    }
  }

  handleChangeTypeAnnonce = (e) => {
    this.setState(
      {
        [e.target.name]: this.getTypeAnnonce(e.target.value),
      }
    )
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const annonce = {
      titre: this.state.titre,
      description: this.state.description,
      date: this.state.date,
      typeAnnonce: this.state.typeAnnonce
    };
    console.log("Annonce envoyée: ")
    console.log(annonce)
    const url = `${API.urlAnnonces}${API.urlPost}`
    console.log(url)
    axios.post(url, annonce)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: `Erreur à implémenter`
        });
      })
  }

  render() {
    const {buttonLabel, className} = this.props
    const {titre, description, typeAnnonce, date} = this.state;
    let typesAnnonces = this.state.typesAnnonces.map((typeAnnonce) => {
      return (
        <option key={typeAnnonce.id}>{typeAnnonce.type}</option>
      )
    })
    console.log(this.state)
    return (
      <>
        <Form onSubmit={this.handleSubmit} className="mb-5">
        {/* Titre de l'annonce */}       
          <FormGroup>
            <Label for="exampleAddress">Titre de l'annonce</Label>
            <Input 
              type="text" 
              name="titre"  
              value={titre}
              placeholder="titre de l'annonce" 
              onChange={this.handleChange}
            />
          </FormGroup>   
          <Row>
            {/* Type d'annonce */}       
            <Col sm="6">
            <FormGroup>
                <Label for="exampleSelect">Type d'annonce</Label>
                <Input 
                  type="select" 
                  name="mail" 
                  value ={typeAnnonce}
                  onChange={this.handleChangeTypeAnnonce} 
                >          
                  {typesAnnonces}
                </Input>
              </FormGroup>
            </Col>     
            {/* Date */}       
            <Col sm="6">
              <FormGroup>
                <Label for="examplePassword">Date</Label>
                <Input 
                  type="date" 
                  name="date" 
                  value={date}
                  onChange={this.handleChange}
                >
                </Input>
              </FormGroup>         
            </Col>
          </Row>
          {/* Description */}
          <FormGroup>
            <Label for="exampleAddress">Description de l'annonce</Label>
            <Input 
              type="textarea" 
              name="description" 
              value={description}
              placeholder="description de l'annonce" 
              onChange={this.handleChange}
              rows="10"
            />
          </FormGroup>
          <Row>

          </Row>
          <FormGroup>
            <FormText>
              {this.state.error}
            </FormText>
          </FormGroup>
          <div>
            <Button color="primary" type="submit">Publier</Button>{' '}
            <Button color="secondary" onClick={this.setModal}>Annuler</Button>            
          </div>
          </Form>
      </>
    );
  }
}

export default FormInscription;