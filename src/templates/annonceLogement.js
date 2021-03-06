import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import './annonce.css'
import axios from 'axios'
import MyNavbar from '../components/navbar'
import {Container, Row, Col, Card, CardBody, CardHeader} from 'reactstrap';
import { UncontrolledCarousel } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBuilding, faMapMarkerAlt, faPhone, faCouch} from '@fortawesome/free-solid-svg-icons'
import userImage from './userImage.png'
const API = require('../API.js')


class AnnonceLogement extends Component {
  state={
    titre: '',
    description: '',
    loyer:'',
    charges:'',
    superficie:'',
    type: '',
    rue:'',
    ville:'',
    //Proprio
    prenom: '',
    nom: '',
    mail: '',
    telephone: '',
    photos:[],
    userPhoto:[],
    meuble: new Boolean()
  }
  componentWillMount() {
    const id = this.props.match.params.id
    const urlLogements = `${API.urlLogements}/${id}`
    console.log(urlLogements)
    axios.get(urlLogements).then((response) => {
      this.setState ({
        titre : response.data.titre,
        description: response.data.description,
        superficie: response.data.superficie,
        loyer: response.data.loyer,
        charges: response.data.charges,
        photos: response.data.photosAnnonce,
        rue: response.data.rue,
        ville :response.data.ville,
        meuble: response.data.meuble
      })
    });
    const urlUtilisateur = `${API.urlAnnonces}/${id}/${API.urlUtilisateur}`
    console.log(urlUtilisateur)
    axios.get(urlUtilisateur).then((response) => {
      console.log(response.data)
      this.setState ({
        prenom : response.data.prenom,
        nom : response.data.nom,
        mail: response.data.mail,
        telephone: response.data.telephone,
        userPhoto: response.data.photoUtilisateur!==null ?`${API.urlPhotos}/${response.data.photoUtilisateur.id}` : undefined

      })
    });
    const urlType = `${API.urlLogements}/${id}${API.urlType}`
    console.log(urlUtilisateur)
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
    console.log(this.state)
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
                    <h5><span className="text-muted">{this.state.loyer}{' €'}</span>{' / mois '}</h5>
                    <h6>{'charges : '}<span className="text-muted">{this.state.charges}{' €'}</span>{' / mois'}</h6>
                  </div>               
                </Card>               
              </div>

              <div className="divWithBorder pt-4 pb-4">
                <h4>Critères</h4>

                <Row>
                  {/* Type de logement */}
                  <Col>
                    <FontAwesomeIcon icon={faBuilding}/>{' '}{this.state.type}
                  </Col>
                  {/* Superficie */}
                  <Col>
                    <img src="https://img.icons8.com/metro/16/000000/surface.png" alt="superficie"/>{' '}{this.state.superficie}{' m2'}
                  </Col>
                </Row>  
                <Row>
                  {/* Adresse */}
                  <Col>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {' '}{this.state.rue}{', '}{this.state.ville}
                  </Col>     
                   {/* Meublé? */}
                   <Col>
                    <FontAwesomeIcon icon={faCouch} />
                    {' '}
                    {this.state.meuble && 'Meublé'}
                    {!this.state.meuble && 'Non meublé'}
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
                      src={this.state.userPhoto ? this.state.userPhoto : userImage} 
                      style={{width: "35px", borderRadius:'50%'}}
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
export default AnnonceLogement;
