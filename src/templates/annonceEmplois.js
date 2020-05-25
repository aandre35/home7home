import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import './annonce.css'
import axios from 'axios'
import MyNavbar from '../components/navbar'
import {Container, Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt, faPhone, faBriefcase, faBuilding} from '@fortawesome/free-solid-svg-icons'
import userImage from './userImage.png'
const API = require('../API.js')


class AnnonceEmplois extends Component {
  state={
    titre: '',
    description: '',
    lieu: '',
    entreprise: '',
    competencesRequises: '',
    type: '',
    photos:[],
  }
  componentWillMount() {
    const id = this.props.match.params.id
    const urlEmplois = `${API.urlEmplois}/${id}`
    console.log(urlEmplois)
    axios.get(urlEmplois).then((response) => {
      this.setState ({
        titre : response.data.titre,
        description: response.data.description,
        lieu: response.data.lieu,
        entreprise: response.data.entreprise,
        competencesRequises: response.data.competencesRequises,
        photos: response.data.photosAnnonce,
      })
    });
    const urlUtilisateur = `${API.urlAnnonces}/${id}/${API.urlUtilisateur}`
    console.log(urlUtilisateur)
    axios.get(urlUtilisateur).then((response) => {
      this.setState ({
        prenom : response.data.prenom,
        nom : response.data.nom,
        mail: response.data.mail,
        telephone: response.data.telephone
      })
    });
    const urlType = `${API.urlEmplois}/${id}${API.urlType}`
    console.log(urlType)
    axios.get(urlType).then((response) => {
      this.setState ({
        type : response.data
      })
    });
  }
  
  render() {
    const titre = this.state.titre
    const description = this.state.description.sub(0,100)
    let i=0
    let photos = this.state.photos.map((photo) => {
      i++
      return (
        {
        src: `${API.urlPhotos}/${photo.id}`,
        altText: `Slide ${i}`,
        key: `${i}`
      }
      );
    })
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar/>
          <Container>

          <Row className="pb-5 pt-5">              
            <Col md="8">

              <div className="divWithBorder pb-5">
                <Card className="shadow">
                <UncontrolledCarousel items={photos} />
                  <div className="p-4">
                    <h1>{this.state.titre}</h1>
                    <h5><span className="text-muted">{this.state.loyer}{' €'}</span>{' / mois'}</h5>
                  </div>               
                </Card>               
              </div>

              <div className="divWithBorder pt-4 pb-4">
                <h4>Critères</h4>

                <Row>
                  {/* Type d'emplois */}
                  <Col>
                    <FontAwesomeIcon icon={faBriefcase}/>
                    {' '}{this.state.type}
                  </Col>
                  <Col>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {' '}{this.state.lieu}
                  </Col>              
                  <Col>
                    <FontAwesomeIcon icon={faBuilding} />
                    {' '}{this.state.entreprise}
                  </Col>        
                </Row>  
              </div>
              <div className="divWithBorder pt-4 pb-4 mb-4">
                <h4>Description</h4>
                <p>
                  {this.state.description}
                </p>  
              </div>
              <div className="divWithBorder pt-4 pb-4 mb-4">
                <h4>Compétences requises</h4>
                <p>
                  {this.state.competencesRequises}
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
                      alt="user"
                    />
                      {' '}{this.state.prenom} {this.state.nom}
                    </h6>
                </CardHeader> 
                <CardBody>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope}/> {this.state.mail}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone}/> {this.state.telephone}
                  </p>
                </CardBody>              
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default AnnonceEmplois;
