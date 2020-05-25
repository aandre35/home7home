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
    typeAnnonce:'',
    typesAnnonces: [],
    typesLogements: [],
    typesEmplois: [],
    typesServices: [],
    allSelected: true,
    logementSelected: false,
    serviceSelected: false,
    emploiSelected: false,
    tagsTypesLogement: new Map() 
  }
  init= () => {
    this.setState({
      allSelected: true,
      logementSelected: false,
      serviceSelected: false,
      emploiSelected: false,
    }) 
  }
  select= (e) =>{
    if (e.target.value === "all") {
      this.init()
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

  typeLogementChange = (e) => {
    e.preventDefault()
    const bool = this.state.tagsTypesLogement.get(e.target.value)
    var newTags = this.state.tagsTypesLogement
    newTags.set(e.target.value, !bool)
    this.setState({
      tagsTypesLogement: newTags
    })
  }
  componentWillMount() {
    const urlAnnonces = `${API.urlAnnonces}${API.urlGet}`
    console.log(urlAnnonces)
    axios.get(urlAnnonces).then((response) => {
      this.setState({
        annonces : response.data
      })
    });

    const urlLogements = `${API.urlLogements}${API.urlSearch}`
    console.log(urlLogements)
    axios.get(urlLogements).then((response) => {
      this.setState({
        logements : response.data
      })
    });
    const urlEmplois = `${API.urlEmplois}${API.urlSearch}`
    console.log(urlEmplois)
    axios.get(urlEmplois).then((response) => {
      this.setState({
        emplois : response.data
      })
    });
    const urlServices = `${API.urlServices}${API.urlSearch}`
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
    var tagsTypesLogement = new Map()
    const urlTypesLogements = `${API.urlTypesLogements}${API.urlGet}`
    console.log(urlTypesLogements)
    axios.get(urlTypesLogements).then((response) => {
      response.data.map(r => tagsTypesLogement.set(r.type, false))
      console.log(tagsTypesLogement)
      this.setState({
        typesLogements : response.data,
        tagsTypesLogement: tagsTypesLogement
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
  /*
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      console.log(this.state.tagsTypesLogement)
      console.log(prevState.tagsTypesLogement)
      var urlTypesLogements;
    }
  }
  */

  render() {
    {/* Annonces */}
    let annonces = this.state.annonces.map((annonce) => {
      const photo =annonce.photosAnnonce[0]!= undefined ? `${API.urlPhotos}/${annonce.photosAnnonce[0].id}` : "Pas de photo"
      return (
        <Cadre key={annonce.id}
          titre={annonce.titre}
          description={annonce.description}
          photo={photo}
          id={annonce.id}
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
            <Input 
              type="checkbox" 
              name="typeLogement"
              value={typeLogement.type}
              onChange={this.typeLogementChange}
            />
              {typeLogement.type}
          </Label>
        </FormGroup>
      )
    })
    let logements = this.state.logements.map((annonce) => {
      const photo =annonce.photosAnnonce[0]!= undefined ? `${API.urlPhotos}/${annonce.photosAnnonce[0].id}` : "Pas de photo"
      return (
        <Cadre key={annonce.id}
          titre={annonce.titre}
          description={annonce.description}
          photo={photo}
          id={annonce.id}
        />
      )
    });
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
    let emplois = this.state.emplois.map((annonce) => {
      const photo =annonce.photosAnnonce[0]!= undefined ? `${API.urlPhotos}/${annonce.photosAnnonce[0].id}` : "Pas de photo"
      return (
        <Cadre key={annonce.id}
          titre={annonce.titre}
          description={annonce.description}
          photo={photo}
          id={annonce.id}
        />
      )
    });
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
    let services = this.state.services.map((annonce) => {
      const photo =annonce.photosAnnonce[0]!= undefined ? `${API.urlPhotos}/${annonce.photosAnnonce[0].id}` : "Pas de photo"
      return (
        <Cadre key={annonce.id}
          titre={annonce.titre}
          description={annonce.description}
          photo={photo}
          id={annonce.id}
        />
      )
    });
    const titre = "Annonces";
    const description = "Nous proposons des annonces de logements, de divers services, ainsi que des offres d'emplois.";
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
                  <Form name="formTypeLogements">
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
              {this.state.allSelected && annonces}
              {this.state.logementSelected && logements}
              {this.state.serviceSelected && services}
              {this.state.emploiSelected && emplois}

            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Annonces;
