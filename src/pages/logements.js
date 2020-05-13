import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';
  import {Helmet} from "react-helmet";
const API = require('../API.js')

class Logements extends Component {
  state = {
    logements: [],
    typeLogements: []
  }
  componentWillMount() {
    const urlLogements = `${API.urlLogements}${API.urlGet}`
    console.log(urlLogements)
    axios.get(urlLogements).then((response) => {
      this.setState({
        logements : response.data
      })
    });
    const urlTypesLogements = `${API.urlTypesLogements}${API.urlGet}`
    console.log(urlTypesLogements)
    axios.get(urlTypesLogements).then((response) => {
      this.setState({
        typeLogements : response.data
      })
    });
  }
  render() {
    let logements = this.state.logements.map((logement) => {
      return (
        <Cadre key={logement.id}
          titre={logement.titre}
          description={logement.description}
          photo={logement.photoLogement}
          url={`logements/${logement.id}`}
        />
      )
    });
    let typeLogements = this.state.typeLogements.map((typeLogement) => {
      return(
        <FormGroup check inline key={typeLogement.id}>
          <Label check>
            <Input type="checkbox" /> {typeLogement.type}
          </Label>
        </FormGroup>
      )
    })
    const titre = "Logements";
    const description = "Liste des logements";
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
                  <h6>Type de logement</h6>
                </CardHeader>
                <CardBody>
                  <Form>
                    {typeLogements}
                  </Form>
                </CardBody>              
              </Card>
              <Card>
                <CardHeader>
                  <h6>Loyer</h6>
                </CardHeader>
                <CardBody>
                  <Form> 
                  <Row>
                    <Col l="6">
                      <FormGroup>
                        <Label for="exampleEmail">Min</Label>
                        <Input type="number" name="email" id="exampleEmail" placeholder="0€" />
                      </FormGroup>
                    </Col>
                    <Col l="6" className="text-right">
                      <FormGroup>
                        <Label for="exampleEmail">Max</Label>
                        <Input type="number" name="email" id="exampleEmail" placeholder="1000€" />
                      </FormGroup>
                    </Col>
                  </Row>
                  </Form>
                </CardBody>              
              </Card>
            </Col>
            <Col md="8">
              {logements}
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Logements;
