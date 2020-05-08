import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';
import {Helmet} from "react-helmet";

class Services extends Component {
  state = {
    emplois: [],
    typesEmplois: []
  }
  componentWillMount() {
    axios.get('http://localhost:8080/emplois').then((response) => {
      this.setState({
        emplois : response.data
      })
    });
    axios.get('http://localhost:8080/typeEmplois').then((response) => {
      this.setState({
        typesEmplois : response.data
      })
    });
  }
  render() {
    let emplois = this.state.emplois.map((emploi) => {
      return (
        <Cadre key={emploi.id}
          titre={emploi.titre}
          description={emploi.descriptionPoste}
          photo={emploi.photoLogement}
          url={`emplois/${emploi.id}`}
        />
      )
    });
    let typesEmplois = this.state.typesEmplois.map((typesEmploi) => {
      return (
        <FormGroup check inline key={typesEmploi.id}>
          <Label check>
            <Input type="checkbox" /> {typesEmploi.type}
          </Label>
        </FormGroup>
      )
    })
    const titre = "Offres d'emplois";
    const description = "Liste des offres d'emplois et de stage";
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
        <Container fluid>
          <Row>
            <Col md="4" className="pb-5">
              <Card>
                <CardHeader>
                  <h6>Type de contrat</h6>
                </CardHeader>
                <CardBody>
                  <Form>
                    {typesEmplois}
                  </Form>
                </CardBody>              
              </Card>
            </Col>
            <Col md="8">
              {emplois}
            </Col>
          </Row>
        </Container>
      </div>
  )}
}

export default Services;
