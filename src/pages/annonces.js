import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';
  import {Helmet} from "react-helmet";
const API = require('../API.js')

class Annonces extends Component {
  state = {
    annonces: [],
    typesAnnonces: [],
    typeLogements: [],
  }
  componentWillMount() {
    const urlAnnonces = `${API.urlAnnonces}${API.urlGet}`
    console.log(urlAnnonces)
    axios.get(urlAnnonces).then((response) => {
      this.setState({
        annonces : response.data
      })
    });
    const urlTypesAnnonces = `${API.urlTypesAnnonces}${API.urlGet}`
    console.log(urlTypesAnnonces)
    axios.get(urlTypesAnnonces).then((response) => {
      this.setState({
        typesAnnonces : response.data
      })
    });
  }
  render() {
    let annonces = this.state.annonces.map((annonce) => {
      return (
        <Cadre key={annonce.id}
          titre={annonce.titre}
          description={annonce.description}
          photo={annonce.photosAnnonce}
          url={`logements/${annonce.id}`}
        />
      )
    });
    let typesAnnonces = this.state.typesAnnonces.map((typeAnnonce) => {
      return(
        <FormGroup check inline key={typeAnnonce.id}>
          <Label check>
            <Input type="checkbox" /> {typeAnnonce.type}
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
            <Col md="4" className="pb-5">
              <Card>
                <CardHeader>
                  <h6>Types d'annonces</h6>
                </CardHeader>
                <CardBody>
                  <Form>
                    {typesAnnonces}
                  </Form>
                </CardBody>              
              </Card>
            </Col>
            <Col md="8">
              {annonces}
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Annonces;
