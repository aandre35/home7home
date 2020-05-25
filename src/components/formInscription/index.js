import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, DropdownItem,
  Form, FormGroup, Label, Input, Row, Col, FormText} from 'reactstrap';
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
      error: '',
      photoPath : "",
      idUtilisateur: 0,
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

  handleChangeFile = (e) => {
    this.setState(
      {
        photo: e.target.files[0],
      }
    )
    console.log(e.target.value)
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
        this.setState({
          error: `Vous êtes déjà inscrit.`
        });
      })
    setTimeout(console.log("1000ms"), 1000)
    const urlUtilisateur = `${API.urlUtilisateurs}${API.urlGet}`
    console.log(urlUtilisateur)
    axios.get(urlUtilisateur)
      .then(res => {
        var id;
        res.data.map((d) => {id=d.id})
        console.log(id)
        this.setState({
          idUtilisateur: id
        })
      })
      .catch(error => {
        console.log(error)
    })
    setTimeout(console.log("1000ms"), 1000)
    const urlPostPhoto = `${API.urlPhotos}/utilisateur/${this.state.idUtilisateur}/?photofile=${this.state.photoPath}`
    console.log(urlPostPhoto)
    axios.get(urlPostPhoto)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
    })

    this.setModal();

  }

  setModal= () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    const {buttonLabel, className} = this.props
    const {nom, prenom, mail, password, photoPath} = this.state;
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
              <FormGroup>
                <Label for="exampleAddress">Prénom</Label>
                <Input 
                  type="text" 
                  name="photoPath" 
                  value={photoPath}
                  placeholder="chemin de votre photo" 
                  onChange={this.handleChange}
                />
              </FormGroup>
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
            <FormGroup>
              <FormText>
                {this.state.error}
              </FormText>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">{buttonLabel}</Button>{' '}
            <Button color="secondary" onClick={this.setModal}>Annuler</Button>
          </ModalFooter>
          </Form>
        </Modal>        
      </>
    );
  }
}

export default FormInscription;