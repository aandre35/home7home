import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, FormText} from 'reactstrap';
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
      photos: [],
      error: '',
      rue:'',
      ville:'',
      superficie:'',
      loyer:0,
      meuble: true,
      charges: 0,
      logementSelected: true,
      serviceSelected: false,
      emploiSelected: false,
    }
  }

  componentWillMount() {
    const url = `${API.urlTypesAnnonces}${API.urlGet}`
    axios.get(url)
    .then((response) =>{
      this.setState({
        typesAnnonces: response.data,
      })
    })
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

  getTypeAnnonce= (name) => {
    const typesAnnonces = this.state.typesAnnonces
    return typesAnnonces[typesAnnonces.indexOf(name)]
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
      const url = `${API.urlLogements}${API.urlPost}`
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
    
  }

  render() {
    const {titre, description, typeAnnonce, date, photos} = this.state;
    const {rue, ville, superficie, loyer, meuble, charges} = this.state
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
            <Col sm="5">
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

            <Col sm="5">
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

            <Col sm="2">
              <FormGroup>
                <Label for="imageFile">File</Label>
                <Input 
                  type="file" 
                  name="photos" 
                  id="imageFile" 
                  value={photos}
                  onChange={this.handleChange}
                />
                <FormText color="muted">
                  format accepté: .jpg
                </FormText>
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
                  id="selectTypeLogement" 
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