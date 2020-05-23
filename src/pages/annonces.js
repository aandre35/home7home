import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col,
  Form, FormGroup, Label, Input, CustomInput} from 'reactstrap';
  import {Helmet} from "react-helmet";
import CardTag from '../components/cardTag'
const API = require('../API.js')

class Annonces extends Component {
  state = {
    annonces: [],
    logements: [],
    services: [],
    emplois: [],
    typesAnnonces: [],
    typesLogements: [],
    typesEmplois: [],
    typesServices: [],
    allSelected: true,
    logementSelected: false,
    serviceSelected: false,
    emploiSelected: false,
  }
  select= (e) =>{
    if (e.target.value === "all") {
      this.setState({
        allSelected: true,
        logementSelected: false,
        serviceSelected: false,
        emploiSelected: false,
      })
    } 
    else {
      this.setState(
        {
          allSelected: false,
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
  }
  componentWillMount() {
    const urlAnnonces = `${API.urlAnnonces}${API.urlGet}`
    console.log(urlAnnonces)
    axios.get(urlAnnonces).then((response) => {
      this.setState({
        annonces : response.data
      })
    });
    const urlLogements = `${API.urlLogements}${API.urlGet}`
    console.log(urlLogements)
    axios.get(urlLogements).then((response) => {
      this.setState({
        logements : response.data
      })
    });
    const urlEmplois = `${API.urlEmplois}${API.urlGet}`
    console.log(urlEmplois)
    axios.get(urlEmplois).then((response) => {
      this.setState({
        emplois : response.data
      })
    });
    const urlServices = `${API.urlServices}${API.urlGet}`
    console.log(urlServices)
    axios.get(urlServices).then((response) => {
      this.setState({
        services : response.data
      })
    });
    const urlTypesAnnonces = `${API.urlTypesAnnonces}${API.urlGet}`
    console.log(urlTypesAnnonces)
    axios.get(urlTypesAnnonces).then((response) => {
      this.setState({
        typesAnnonces : response.data
      })
    });
    const urlTypesLogements = `${API.urlTypesLogements}${API.urlGet}`
    console.log(urlTypesLogements)
    axios.get(urlTypesLogements).then((response) => {
      this.setState({
        typesLogements : response.data
      })
    });
    const urlTypesEmplois = `${API.urlTypesEmplois}${API.urlGet}`
    console.log(urlTypesEmplois)
    axios.get(urlTypesEmplois).then((response) => {
      this.setState({
        typesEmplois : response.data
      })
    });
    const urlTypesServices = `${API.urlTypesServices}${API.urlGet}`
    axios.get(urlTypesServices).then((response) => {
      this.setState({
        typesServices : response.data
      })
    });
  }

  render() {
    {/* Annonces */}
    let annonces = this.state.annonces.map((annonce) => {
      return (
        <Cadre key={annonce.id}
          titre={annonce.titre}
          description={annonce.description}
          photo="http://localhost:8080/api/photos/24"
          url={`logements/${annonce.id}`}
        />
      )
    });
    let typesAnnonces = this.state.typesAnnonces.map((typeAnnonce) => {
      return(
        <FormGroup check key={typeAnnonce.id}>
          <Label check>
            <Input 
              type="radio" 
              name="radioAnnonce" 
              value={typeAnnonce.type}
              onClick={this.select}
            /> {typeAnnonce.type}
          </Label>
        </FormGroup>
      )
    })
    {/* Logements */}
    let typesLogements = this.state.typesLogements.map((typeLogement) => {
      return(
        <FormGroup check inline key={typeLogement.id}>
          <Label check>
            <Input type="checkbox" /> {typeLogement.type}
          </Label>
        </FormGroup>
      )
    })
    {/* Emplois */}
    let typesEmplois = this.state.typesEmplois.map((typesEmploi) => {
      return (
        <FormGroup check inline key={typesEmploi.id}>
          <Label check>
            <Input type="checkbox" /> {typesEmploi.type}
          </Label>
        </FormGroup>
      )
    })
    var lieuxEmploisDiff = []
    let putLieuxEmploisDiff = this.state.emplois.forEach((emploi) => {
      if (lieuxEmploisDiff.indexOf(emploi.lieu) === -1) {
        lieuxEmploisDiff.push(emploi.lieu)
      }
    })
    let lieuxEmplois = lieuxEmploisDiff.map((lieu) => {
      return(
        <FormGroup check inline key={lieuxEmploisDiff.indexOf(lieu)}>
          <Label check>
            <Input type="checkbox" /> {lieu}
          </Label>
        </FormGroup>
      )
    })    
    {/* Services */}
    let typesServices = this.state.typesServices.map((type) => {
      return (
        <FormGroup check inline key={type.id}>
          <Label check>
            <Input type="checkbox" /> {type.type}
          </Label>
        </FormGroup>
      )
    })
    const titre = "Annonces";
    const description = "Toutes nos annonces";
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Annonces | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
        <Container fluid>
          <Row>
            <Col md="3" className="pb-5">
              <CardTag title="Type d'annonce">
                <Form>
                    <FormGroup check inline>
                      <Label check>
                        <Input 
                          type="radio"
                          name="radioAnnonce" 
                          value="all"
                          onClick={this.select}
                        /> Toutes catégories
                      </Label>
                    </FormGroup>
                    {typesAnnonces}
                  </Form>
              </CardTag>
              {this.state.logementSelected &&
              <>
                <CardTag title="Type de logement">
                  <Form>
                    {typesLogements}
                  </Form>
                </CardTag>
                <CardTag title="Superficie">
                  <Form>
                  <FormGroup>
                    <Row>
                        <Col l="6">
                          <FormGroup>
                            <Label for="superficieMin">Min</Label>
                            <Input type="number" name="email" id="superficieMin" placeholder="0 m2" />
                          </FormGroup>
                        </Col>
                        <Col l="6" className="text-right">
                          <FormGroup>
                            <Label for="superficieMax">Max</Label>
                            <Input type="number" name="email" id="superficieMax" placeholder="150 m2" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form>
                </CardTag>
                <CardTag title="Loyer">
                  <Form>
                    <Row>
                      <Col l="6">
                        <FormGroup>
                          <Label for="loyerMin">Min</Label>
                          <Input type="number" name="email" id="loyerMin" placeholder="0€" />
                        </FormGroup>
                      </Col>
                      <Col l="6" className="text-right">
                        <FormGroup>
                          <Label for="loyerMax">Max</Label>
                          <Input type="number" name="email" id="loyerMax" placeholder="1000€" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardTag>
                <CardTag title="Meublé">
                  <Form>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> Oui
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox"/> Non
                      </Label>
                    </FormGroup>      
                  </Form>
                </CardTag>
              </>
              }
              {this.state.serviceSelected &&
                <CardTag title="Type de service">
                  <Form>
                    {typesServices}
                  </Form>
                </CardTag>
              }
              {this.state.emploiSelected &&
              <>
                <CardTag title="Type de contrat">
                  <Form>
                    {typesEmplois}
                  </Form>
                </CardTag>
                <CardTag title="Lieu">
                  <Form>
                    {lieuxEmplois}
                  </Form>
                </CardTag>
              </>
              }
            </Col>
            <Col md="9">
              {annonces}
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Annonces;
