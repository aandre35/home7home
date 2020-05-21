import React, { Component } from 'react';
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import SearchBar from '../components/searchBarHome'
import {Helmet} from "react-helmet";
import { Container, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Row, Col, Card, Button } from 'reactstrap';
import axios from 'axios'
import draftImg from './318x180.svg'
import { Link } from 'react-router-dom';

const API = require('../API.js')

class Home extends Component {
  state= {
    annonces: []
  }
  componentWillMount(){
    const url = `${API.urlAnnonces}${API.urlGet}`
    console.log(url)
    axios.get(url).then((response) => {
      this.setState({
        annonces : response.data
      })
    });
  }
  
  render() {
    const size =4
    let annonces = this.state.annonces.slice(0,size).map((annonce) => {
      return (
        
        <Col md className="pb-4">
          <Card key={annonce.id} className="card-exp">
            <CardImg top width="100%" src={draftImg} alt="Card image cap" />
            <CardBody>
              <CardTitle>{annonce.titre}</CardTitle>
              <CardSubtitle className="text-muted">{annonce.typeAnnonce}</CardSubtitle>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </Col>
        
      )
    });
    const titre = "Home";
    const description = "Bienvenue sur home7home, vous trouverez ci-dessous nos dernières annonces";
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar/>
        <Banner titre={titre} description={description}></Banner>
        <Container >
          <Row>
          {annonces}
          </Row>
          <Link to="/annonces">            
            <div className="text-center mb-4">
              <Button color="success">Voir plus d'annonces</Button>
            </div>
          </Link>

        </Container>
        
      </div>
    )
  }
}

export default Home;

