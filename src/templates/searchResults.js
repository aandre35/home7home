import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import { Container, Row, Col, Card, CardBody, CardHeader,
  Form, FormGroup, Label, Input} from 'reactstrap';
import {Helmet} from "react-helmet";

const API = require('../API.js')

class SearchResults extends Component {
  state = {
    annonces: [],
    typesAnnonces: [],
  }
  componentWillMount() {
    const urlTypesAnnonces = `${API.urlTypesAnnonces}${API.urlGet}`
    console.log(urlTypesAnnonces)
    axios.get(urlTypesAnnonces).then((response) => {
      this.setState({
        typesAnnonces : response.data
      })
    });
    const req = this.props.match.params.req
    console.log(req)
    const url = `${API.urlAnnoncesSearch}?search=${req}`;
    console.log(url);
    axios.get(url)
      .then((response) => {
        this.setState(
          {
            annonces: response.data
          }
        )
      }) 
  }
  componentDidUpdate(prevProps){
    if (prevProps.match.params.req !== this.props.match.params.req) {
      const req = this.props.match.params.req
      console.log(req)
      const url = `${API.urlAnnoncesSearch}?search=${req}`;
      console.log(url);
      axios.get(url)
        .then((response) => {
          this.setState(
            {
              annonces: response.data
            }
          )
        }
      ) 
    }
  }
  render() {
    const listAnnonces = this.state.annonces
    let annonces = listAnnonces.map((annonce) => {
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
    function getAnnonces () {
      if (listAnnonces.length ===0) {
        return (
        <div>
          <h3>Désolé... Nous n'avons pas trouvé de résultats</h3>
        </div>
        )
      } else {
        return annonces
      }
    }
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
              {getAnnonces()}
            </Col>
          </Row>
        </Container>
      </div>
    )

  }
}

export default SearchResults;
