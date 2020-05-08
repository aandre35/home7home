import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem,
  Form, FormGroup, Label, Input, Row, Col, FormText, Container } from 'reactstrap';
import axios from 'axios'
import MyNavbar from '../components/navbar'

class FormInscription extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nom: '',
      prenom: '',
      mail: '',
      password: ''
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
    console.log(this.state)
    
    axios.post(`http://localhost:8080/utilisateurs`, this.state)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const {nom, prenom, mail, password} = this.state;
    
    return (
      <div>
        <MyNavbar></MyNavbar>
        <section>
      <Container>
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
            <Button color="primary" type="submit">S'inscrire</Button>
          </FormGroup>
        </Form>
      </Container>
      </section>
      </div>
    );
  }
}

export default FormInscription;