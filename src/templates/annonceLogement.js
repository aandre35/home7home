import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import './annonce.css'
import axios from 'axios'
import MyNavbar from '../components/navbar'
import {Container, Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBuilding, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import Geocode from "react-geocode";
import userImage from './userImage.png'

const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  }
];

const MonCarousel = () => <UncontrolledCarousel items={items} />;
class AnnonceLogement extends Component {
  state={
    titre: '',
    description: '',
    type: '',
    rue:'',
    ville:'',
    //Proprio
    prenom: '',
    nom: '',
    mail: '',
    photo:'',
  }
  componentWillMount() {
    const id = this.props.match.params.id
    axios.get(`http://localhost:8080/logements/${id}`).then((response) => {
      this.setState ({
        titre : response.data.titre,
        description: response.data.description,
        photo: response.data.photo,
        type: response.data.typeLogement,
        rue: response.data.rue,
        ville :response.data.ville
      })
      console.log(this.state)
    });
    axios.get(`http://localhost:8080/proprietaireLogement/${id}`).then((response) => {
      this.setState ({
        prenom : response.data.prenom,
        nom : response.data.nom,
        mail: response.data.mail
      })
      console.log(this.state)
    });
  }
  
  render() {
    Geocode.setApiKey("AIzaSyAMygzpuadRfZUZ7UfHPVkxnv0Ee1ATVAA");
    Geocode.setLanguage("fr");
    Geocode.setRegion("fr");
    Geocode.enableDebug();
    Geocode.fromAddress("Eiffel Tower").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );

    const titre = this.state.titre
    const description = this.state.description.sub(0,100)
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar/>
          <Container>
            <div className="pt-5 pb-4">
              <h1>{this.state.titre}</h1>
            </div>
          <Row className="pb-5">              
            <Col md="8">

              <MonCarousel />
              <div className="divWithBorder pt-4 pb-4">
                <h4>Critères</h4>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faBuilding}/>
                  </Col>
                  <Col>
                    <img src="https://img.icons8.com/metro/16/000000/surface.png"/>
                  </Col>
                  <Col>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {' '}{this.state.rue}{', '}{this.state.ville}
                  </Col>

                </Row>  
              </div>
              <div className="divWithBorder pt-4 pb-4 mb-4">
                <h4>Description</h4>
                <p>
                  {this.state.description}
                </p>  
              </div>
            </Col>
            <Col md="4">
              <Card>
                <CardHeader>           
                  <h6>
                    <img 
                      src={userImage} 
                      style={{width: "35px"}}
                      alt="user image"/>
                      {' '}{this.state.prenom} {this.state.nom}
                    </h6>
                </CardHeader> 
                <CardBody>
                  <FontAwesomeIcon icon={faEnvelope}/> {this.state.mail}
                </CardBody>              
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default AnnonceLogement;
