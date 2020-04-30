import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';

class Services extends Component {
  state = {
    users: []
  }
  componentWillMount() {
    axios.get('http://localhost:8080/projet_applis_web/rest/listutilisateurs').then((response) => {
      this.setState({
        users : response.data
      })
    });
  }
  render() {
    let Holder;
    window.addEventListener('DOMContentLoaded', () => {
      Holder = require('holderjs');
    });
    let emplois = this.state.users.map((emploi) => {
      return (
        <Cadre 
          titre={emploi.titre}
          description={emploi.description}
          photo={emploi.photoLogement}
        />
      )
    });
    const titre = "Offres d'emplois";
    const description = "Liste des offres d'emplois et de stage";
    return (
      <div>
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
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" /> CDD
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" /> CDI
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" /> Stage
                    </Label>
                  </FormGroup>
                </Form>
              </CardBody>              
            </Card>
          </Col>
          <Col md="8">
            <Cadre></Cadre>
            <Cadre></Cadre>
            <Cadre></Cadre>
            <Cadre></Cadre>
          </Col>
        </Row>
      </Container>
    </div>

  )}
}

export default Services;
