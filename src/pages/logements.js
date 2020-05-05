import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';

class Logements extends Component {
  state = {
    users: []
  }
  componentWillMount() {
    axios.get('http://localhost:8080/utilisateurs').then((response) => {
      this.setState({
        users : response.data
      })
    });
  }
  render() {
    let logements = this.state.users.map((logement) => {
      return (
        <Cadre 
          titre={logement.titre}
          description={logement.description}
          photo={logement.photoLogement}
        />
      )
    });
    const titre = "Logements";
    const description = "Liste des logements";
    return (
      <div>
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
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> T1
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> T2
                      </Label>
                    </FormGroup>                    
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> Studio
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input type="checkbox" /> Colocation
                      </Label>
                    </FormGroup>
                  </Form>
                </CardBody>              
              </Card>
              <Card>
                <CardHeader>
                  <h6>Loyer</h6>
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
                        <Input type="number" name="email" id="exampleEmail" placeholder="1000€" />
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

export default Logements;
