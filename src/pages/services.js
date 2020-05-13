import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';
import {Helmet} from "react-helmet";
const API = require('../API.js')

class Services extends Component {
  state = {
    services: [],
    typesServices: []
  }
  componentWillMount() {
    const urlServices = `${API.urlServices}${API.urlGet}`
    console.log(urlServices)
    axios.get(urlServices).then((response) => {
      this.setState({
        services : response.data
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
    let services = this.state.services.map((service) => {
      return (
        <Cadre key={service.id}
          titre={service.titre}
          description={service.description}
          photo={service.photoLogement}
          url={`services/${service.id}`}
        />
      )
    });
    let typesServices = this.state.typesServices.map((type) => {
      return (
        <FormGroup check inline key={type.id}>
          <Label check>
            <Input type="checkbox" /> {type.type}
          </Label>
        </FormGroup>
      )
    })
    const titre = "Services";
    const description = "Liste des services";
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
                  <h6>Type de Service</h6>
                </CardHeader>
                <CardBody>
                  <Form>
                    {typesServices}
                  </Form>
                </CardBody>              
              </Card>
              <Card>
                <CardHeader>
                  <h6>Prix (à l'heure)</h6>
                </CardHeader>
                <CardBody>
                  <Form row> 
                  <Row>
                    <Col l="6">
                      <FormGroup>
                        <Label for="exampleEmail">Min</Label>
                        <Input type="number" name="email" id="exampleEmail" placeholder="0€" />
                      </FormGroup>
                    </Col>
                    <Col l="6" text-right>
                      <FormGroup>
                        <Label for="exampleEmail">Max</Label>
                        <Input type="number" name="email" id="exampleEmail" placeholder="30€" />
                      </FormGroup>
                    </Col>
                  </Row>
                  </Form>
                </CardBody>              
              </Card>
            </Col>
            <Col md="8">
              {services}
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Services;
