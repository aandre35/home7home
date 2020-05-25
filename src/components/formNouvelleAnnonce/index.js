import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, FormText} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import axios from 'axios'

const API = require('../../API.js')

class FormInscription extends Component {

  constructor(props) {
    super(props)

    this.state = {
      titre: '',
      description: '',
      date: '',
      typesAnnonces: [],
      typesLogements: [],
      typesServices: [],
      typesLogements: [],
      typesEmplois: [],
      typeLogement: '',
      typeEmploi: '',
      typeService: '',
      photos: [],
      error: '',
      rue:'',
      ville:'',
      superficie:0,
      loyer:0,
      meuble: true,
      charges: 0,
      lieu:'',
      entreprise: '',
      competencesRequises: '',
      logementSelected: true,
      serviceSelected: false,
      emploiSelected: false,
      redirect: false
    }
  }

  componentWillMount() {
    const urlTypesAnnonces = `${API.urlTypesAnnonces}${API.urlGet}`
    axios.get(urlTypesAnnonces)
    .then((response) =>{
      this.setState({
        typesAnnonces: response.data,
      })
    })
    const urlTypesLogements = `${API.urlTypesLogements}${API.urlGet}`
    axios.get(urlTypesLogements)
      .then((response) => {
        this.setState({
          typesLogements: response.data,
          typeLogement: response.data[0].type
        })
      })
    const urlTypesEmplois = `${API.urlTypesEmplois}${API.urlGet}`
    axios.get(urlTypesEmplois)
      .then((response) => {
        this.setState({
          typesEmplois: response.data,
          typeEmploi: response.data[0].type
        })
      })
    const urlTypesServices = `${API.urlTypesServices}${API.urlGet}`
    axios.get(urlTypesServices)
      .then((response) => {
        this.setState({
          typesServices: response.data,
          typeService: response.data[0].type
        })
      })

  }
  setRedirect =() => {
    this.setState({
      redirect: !this.state.redirect,
    })
  }
  renderRedirect = () => {
    if(this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/annonces",
            state: { from: this.state.location }
          }}
        />
      );
    }
  }
  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
    console.log(this.state)
  }

  handleChangeMeuble = (e) => {
    this.setState(
      {
        meuble: !this.state.meuble
      }
    )
    console.log(this.state)
  }

  handleChangeTypeAnnonce = (e) => {
    this.setState(
      {
        logementSelected: false,
        serviceSelected: false,
        emploiSelected: false,          
      }
    )
    const toSelect=`${e.target.value.toLowerCase()}Selected`
    console.log(toSelect)
    this.setState(
      {
        [toSelect]: true
      }
    )    
  }

  handleSubmit = event => {
    event.preventDefault();
    
    if (this.state.logementSelected) {
      const annonce = {
        titre: this.state.titre,
        description: this.state.description,
        date: this.state.date,
        superficie :this.state.superficie,
        loyer: this.state.superficie,
        meuble: this.state.meuble,
        rue: this.state.rue,
        ville: this.state.rue,
        charges: this.state.charges
      };
      console.log("Logement envoyée: ")
      console.log(annonce)
      const url = `${API.urlLogements}${API.urlPost}?type=${this.state.typeLogement}`
      console.log(url)
      axios.post(url, annonce)
        .then(response => {
          console.log(response);
          this.setRedirect()
        })
        .catch(error => {
          console.log(error)
          this.setState({
            error: error.response.data.message
          });
        })
      } else if (this.state.emploiSelected) {
        const emploi = {
          titre: this.state.titre,
          description: this.state.description,
          date: this.state.date,
          lieu: this.state.lieu,
          entreprise: this.state.entreprise,
          competencesRequises :this.state.competencesRequises,
        };
        console.log("Emploi envoyé: ")
        console.log(emploi)
        const url = `${API.urlEmplois}${API.urlPost}?type=${this.state.typeEmploi}`
        console.log(url)
        axios.post(url, emploi)
          .then(response => {
            console.log(response);
            this.setRedirect()
          })
          .catch(error => {
            console.log(error)
            this.setState({
              error: error.response.data.message
            });
          })    
      } else if (this.state.serviceSelected) {
        const service = {
          titre: this.state.titre,
          description: this.state.description,
          date: this.state.date,
        };
        console.log("Service envoyé: ")
        console.log(service)
        const url = `${API.urlEmplois}${API.urlPost}?type=${this.state.typeService}`
        console.log(url)
        axios.post(url, service)
          .then(response => {
            console.log(response);
            this.setRedirect()
          })
          .catch(error => {
            console.log(error)
            this.setState({
              error: error.response.data.message
            });
          })    
      }
  }

  render() {
    const {titre, description, typeAnnonce, date, photos} = this.state;
    const {typeLogement, rue, ville, superficie, loyer, meuble, charges} = this.state
    const {typeService} = this.state
    const {typeEmploi, lieu, entreprise, competencesRequises} = this.state

    let typesAnnonces = this.state.typesAnnonces.map((typeAnnonce) => {
      return (
        <option key={typeAnnonce.id}>{typeAnnonce.type}</option>
      )
    })
    let typesLogements = this.state.typesLogements.map((typeLogement) => {
      return (
        <option key={typeLogement.id}>{typeLogement.type}</option>
      )
    })
    let typesServices = this.state.typesServices.map((typeService) => {
      return (
        <option key={typeService.id}>{typeService.type}</option>
      )
    })
    let typesEmplois = this.state.typesEmplois.map((typeEmploi) => {
      return (
        <option key={typeEmploi.id}>{typeEmploi.type}</option>
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
              <Label for="exampleSelect">Select</Label>
              <Input 
                type="select" 
                name="typeAnnonce" 
                id="exampleSelect" 
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
              rows="6"
            />
          </FormGroup>
          {/* Logements */}
          {this.state.logementSelected &&
          <>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label for="rue">Rue</Label>
                <Input 
                  type="text" 
                  name="rue"  
                  value={rue}
                  placeholder="rue" 
                  onChange={this.handleChange}
                />
              </FormGroup>   
            </Col>

            <Col sm="3">
              <FormGroup>
                <Label for="ville">Ville</Label>
                <Input 
                  type="text" 
                  name="ville"  
                  value={ville}
                  placeholder="ville" 
                  onChange={this.handleChange}
                />
              </FormGroup>  
            </Col>

            <Col sm="3">
              <FormGroup>
                <Label for="selectTypeLogement">Type de logement</Label>
                <Input 
                  type="select" 
                  name="typeLogement" 
                  id="selectTypeLogement" 
                  onChange={this.handleChange}
                >
                  {typesLogements}
                </Input>
              </FormGroup>
            </Col>               
          </Row>

          <Row>
           <Col sm="3">
              <FormGroup>
                <Label for="loyer">Loyer</Label>
                <Input 
                  type="number" 
                  name="loyer"  
                  value={loyer}
                  placeholder="loyer (€/mois)" 
                  onChange={this.handleChange}
                />
              </FormGroup>   
            </Col>

            <Col sm="3">
              <FormGroup>
                <Label for="loyer">Charges</Label>
                <Input 
                  type="number" 
                  name="charges"  
                  value={charges}
                  placeholder="charges (€/mois)" 
                  onChange={this.handleChange}
                />
              </FormGroup>   
            </Col>

            <Col sm="3">
              <FormGroup>
                <Label for="superficie">Superficie</Label>
                <Input 
                  type="number" 
                  name="superficie"  
                  value={superficie}
                  placeholder="superficie(en m2)" 
                  onChange={this.handleChange}
                />
              </FormGroup>   
            </Col>  
            <Col sm="3">
            <FormGroup>
                <Label for="selectMeuble">Meublé ?</Label>
                <Input 
                  type="select" 
                  name="meuble" 
                  id="selectMeuble" 
                  onChange={this.handleChangeMeuble}
                >
                  <option>Oui</option>
                  <option>Non</option>
                </Input>
              </FormGroup>  
            </Col>
  
          </Row>
          </>
          }
          {this.state.serviceSelected &&
          <>
            <Row>
              <Col sm="3">
                <FormGroup>
                  <Label for="selectTypeServices">Type de Service</Label>
                  <Input 
                    type="select" 
                    name="typeService" 
                    id="selectTypeService" 
                    onChange={this.handleChange}
                  >
                    {typesServices}
                  </Input>
                </FormGroup>
              </Col>       
              <Col>
              </Col>        
            </Row>
          </>
          }
          {this.state.emploiSelected &&
          <>
            <Row>
              <Col sm="4">
                <FormGroup>
                  <Label for="selectTypeEmploi">Type d'emplois</Label>
                  <Input 
                    type="select" 
                    name="typeEmploi" 
                    id="selectTypeEmploi" 
                    onChange={this.handleChange}
                  >
                    {typesEmplois}
                  </Input>
                </FormGroup>
              </Col>       
              <Col sm="4">
                <FormGroup>
                  <Label for="superficie">Lieu</Label>
                  <Input 
                    type="text" 
                    name="lieu"  
                    value={lieu}
                    placeholder="lieu du poste" 
                    onChange={this.handleChange}
                  />
                </FormGroup>  
              </Col>    
              <Col sm="4">
                <FormGroup>
                  <Label for="superficie">Entreprise</Label>
                  <Input 
                    type="text" 
                    name="entreprise"  
                    value={entreprise}
                    placeholder="entreprise" 
                    onChange={this.handleChange}
                  />
                </FormGroup>  
              </Col>         
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Compétences requises</Label>
              <Input 
                type="textarea" 
                name="competencesRequises" 
                value={competencesRequises}
                placeholder="description de l'annonce" 
                onChange={this.handleChange}
                rows="5"
              />
            </FormGroup>
          </>
          }
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