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
    let services = this.state.users.map((service) => {
      return (
        <Cadre 
          titre={service.titre}
          description={service.description}
          photo={service.photoLogement}
        />
      )
    });
    const titre = "Services";
    const description = "Liste des services";
    return (
      <div>
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
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> Cours particuliers
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> type service
                      </Label>
                    </FormGroup>
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
              <Cadre></Cadre>
              <Cadre></Cadre>
              <Cadre></Cadre>
              <Cadre></Cadre>
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default Services;
