import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import {Helmet} from "react-helmet";
import {Auth} from '../App.js'
import {Nav, NavItem, TabContent, TabPane, NavLink, Row, Col, Container, Form, FormGroup, Label, Input} from 'reactstrap'
import classnames from 'classnames';
import CadreAnnonce from '../components/cadreAnnonce'
import FormNouvelleAnnonce from '../components/formNouvelleAnnonce'

const API =require('../API.js')

class Compte extends Component {
  state = {
    user: [],
    annonces: [],
    photo:"",
    logementSelected: false,
    serviceSelected: false,
    emploiSelected: false,
    activeTab: 1
  }
  setActiveTab(tab) {
    if(this.state.activeTab !== tab) {
      this.setState({
        activeTab : tab
      })
    }
  }
  componentWillMount() {
    const urlUtilisateur = `${API.urlUtilisateurs}/${Auth.userid}`
    axios.get(urlUtilisateur).then((response) => {
      console.log(urlUtilisateur)
      console.log(response.data)
      this.setState({
        user : response.data,
        annonces: response.data.annonces,
        photo: response.data.photoUtilisateur!==null ?`${API.urlPhotos}/${response.data.photoUtilisateur.id}` : undefined
      })
    });
  }
  render() {
    const user = this.state.user
    const titre = "Mon compte";
    const description = `Bienvenue ${user.prenom}, vous pouvez ajouter de nouvelles annonces`;

    
    const photo = this.state.photo
    let annonces = this.state.annonces.map((annonce) => {
      const photoAnnonce = annonce.photoAnnonce!== null ? `${API.urlPhotos}/${annonce.photosAnnonce[0].id}` : null
      return (
        <CadreAnnonce
          titre={annonce.titre}
          description={annonce.description}
          photo={photoAnnonce}
          id={annonce.id}
        />
      );
    })

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar/>
        <Banner titre={titre} description={description}></Banner>
        <Container>
          {/* Noms des tabs */}
          <Nav tabs className="mb-4">
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.setActiveTab('1'); }}
              >
                Mon profil
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.setActiveTab('2'); }}
              >
                Mes annonces
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.setActiveTab('3'); }}
              >
                Publier une annonce
              </NavLink>
            </NavItem>
          </Nav>
          {/* Mon profil */}
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row className="align-items-center">
                <Col md="3" className= "pb-5">
                  <img 
                    className="w-100" 
                    style={{borderRadius: "50%"}} 
                    src={photo} 
                    alt={user.prenom}
                  />
                </Col>
                <Col md="9" className= "pb-5">
                  <Form >
                    <Row >
                      <Col >
                        <FormGroup>
                          <Label for="exampleAddress">Nom</Label>
                          <Input 
                            type="text" 
                            name="nom"  
                            value={user.nom}
                            placeholder="nom" 
                            onChange={this.handleChange}
                          />
                        </FormGroup>   
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="exampleAddress">Prénom</Label>
                          <Input 
                            type="text" 
                            name="prenom" 
                            value={user.prenom}
                            placeholder="prénom" 
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input 
                            type="email" 
                            name="mail" 
                            value ={user.mail}
                            placeholder="email" 
                            onChange={this.handleChange} />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="examplePassword">Password</Label>
                          <Input 
                            type="password" 
                            name="password" 
                            value={user.password}
                            placeholder="password" 
                            onChange={this.handleChange} />
                        </FormGroup>         
                      </Col>
                    </Row>   
                  </Form>
                </Col>
              </Row>
                
            </TabPane>
            {/* Mes annonces */}
            <TabPane tabId="2">
              {annonces}
            </TabPane>
            {/* Publier une annonce */}
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <FormNouvelleAnnonce/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Container>
      </>
    )
  }
}

export default Compte;
