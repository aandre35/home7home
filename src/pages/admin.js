import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import {Container, Table, ButtonGroup, Button} from 'reactstrap';
import {Helmet} from "react-helmet";
const API = require('../API.js')

class Admin extends Component {

  state = {
    listUtilisateursVisible : false,
    listAnnoncesVisible : false,
    listEmploisVisible : false,
    listServicesVisible : false,
    listLogementsVisible : false,
  }

  render() {
    const titre = "Admin";
    const description = "Accès à la base de données";
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
        <Container>
          <ButtonGroup>
            <Button 
              onClick={() => 
                this.setState({
                  listAnnoncesVisible: false,
                  listUtilisateursVisible : true,
                  listEmploisVisible : false,
                  listServicesVisible : false,
                  listLogementsVisible : false,
                })}
            >
              Utilisateurs
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listAnnoncesVisible: true,
                  listUtilisateursVisible : false,
                  listEmploisVisible : false,
                  listServicesVisible : false,
                  listLogementsVisible : false,
                })}
            >
              Annonces
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listAnnoncesVisible: false,
                  listUtilisateursVisible : false,
                  listEmploisVisible : false,
                  listServicesVisible : false,
                  listLogementsVisible : true,
                })}
            >
              Logements
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listAnnoncesVisible: false,
                  listUtilisateursVisible : false,
                  listEmploisVisible : false,
                  listServicesVisible : true,
                  listLogementsVisible : false,
                })}
            >
              Services
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listAnnoncesVisible: false,
                  listUtilisateursVisible : false,
                  listEmploisVisible : true,
                  listServicesVisible : false,
                  listLogementsVisible : false,
                })}
            >
              Emplois
            </Button>
          </ButtonGroup>
          {this.state.listUtilisateursVisible ? <ListUtilisateurs/> : <div></div>}
          {this.state.listEmploisVisible ? <ListEmplois/> : <div></div>}
          {this.state.listLogementsVisible ? <ListLogements/> : <div></div>}
          {this.state.listServicesVisible ? <ListServices/> : <div></div>}
          {this.state.listAnnoncesVisible ? <ListAnnonces/> : <div></div>}
        </Container>
        
      </div>
    )
  }
}
class ListUtilisateurs extends Component {
  state = {
    utilisateurs: [],
  }
  componentWillMount() {
    const url = `${API.urlUtilisateurs}${API.urlGet}`
    console.log(url)
    axios.get(url).then((response) => {
      console.log(response)
      this.setState({
        utilisateurs : response.data
      })
    });
  }
  render() {
    let utilisateurs = this.state.utilisateurs.map((utilisateur) => {
      return (
        <tr key={utilisateur.id}>
            <th scope="row">{utilisateur.id}</th>
            <td>{utilisateur.prenom}</td>
            <td>{utilisateur.nom}</td>
            <td>{utilisateur.mail}</td>
            <td>{utilisateur.password}</td>
            <td>{utilisateur.annonces.map((annonce => `${annonce.titre} `))}</td>
            <td>{utilisateur.photoUtilisateur}</td>
          </tr>             
      )
    });
    return (    
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Mail</th>
              <th>Password</th>
              <th>Annonces</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs}
          </tbody>
        </Table>
      </div>    
    );
  }
}

class ListAnnonces extends Component {
  state = {
    annonces: [],
  }
  componentWillMount() {
    const url = `${API.urlAnnonces}${API.urlGet}`
    console.log(url)
    axios.get(url).then((response) => {
      this.setState({
        annonces : response.data
      })
    });
  }
  render() {
    let annonces = this.state.annonces.map((annonce) => {
      return (
        <tr key={annonce.id}>
            <th scope="row">{annonce.id}</th>
            <td>{annonce.titre}</td>
            <td>{annonce.description}</td>
            <td>{annonce.utilisateur}</td>
            <td>{annonce.typeAnnonce}</td>
            <td>{annonce.date}</td>
          </tr>             
      )
    });
    return (    
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Utilisateur</th>
              <th>Type d'Annonce</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {annonces}
          </tbody>
        </Table>
      </div>    
    );
  }
}

class ListServices extends Component {
  state = {
    services: [],
  }
  componentWillMount() {
    const url = `${API.urlServices}${API.urlGet}`
    console.log(url)
    axios.get(url).then((response) => {
      this.setState({
        services : response.data
      })
    });
  }
  render() {
    let services = this.state.services.map((service) => {
      return (
        <tr key={service.id}>
            <th scope="row">{service.id}</th>
            <td>{service.titre}</td>
            <td>{service.description}</td>
            <td>{service.typeService}</td>
            <td>{service.photosService}</td>
          </tr>             
      )
    });
    return (    
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Type de Service</th>
              <th>Photos</th>
            </tr>
          </thead>
          <tbody>
            {services}
          </tbody>
        </Table>
      </div>    
    );
  }
}

class ListEmplois extends Component {
  state = {
    emplois: [],
  }
  componentWillMount() {
    const url = `${API.urlEmplois}${API.urlGet}`
    console.log(url)
    axios.get(url).then((response) => {      
      this.setState({
        emplois : response.data
      })
    });
  }
  render() {
    let emplois = this.state.emplois.map((emploi) => {
      return (
        <tr key={emploi.id}>
            <th scope="row">{emploi.id}</th>
            <td>{emploi.lieu}</td>
            <td>{emploi.duree}</td>
            <td>{emploi.titre}</td>
            <td>{emploi.description}</td>
            <td>{emploi.entreprise}</td>
            <td>{emploi.descriptionProfilRecherche}</td>
            <td>{emploi.typeContrat}</td>
            <td>{emploi.service}</td>
          </tr>             
      )
    });
    return (    
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Lieu</th>
              <th>Durée</th>
              <th>Titre</th>
              <th>Description du Poste</th>
              <th>Entreprise</th>
              <th>Description du profil Recherché</th>
              <th>Type de Contrat</th>
              <th>service</th>
            </tr>
          </thead>
          <tbody>
            {emplois}
          </tbody>
        </Table>
      </div>    
    );
  }
}

class ListLogements extends Component {
  state = {
    logements: [],
  }
  componentWillMount() {
    const url = `${API.urlLogements}${API.urlGet}`
    console.log(url)
    axios.get(url).then((response) => {
      this.setState({
        logements : response.data
      })
    });
  }
  render() {
    let logements = this.state.logements.map((logement) => {
      return (
        <tr key={logement.id}>
            <th scope="row">{logement.id}</th>
            <td>{logement.rue}</td>
            <td>{logement.ville}</td>
            <td>{logement.titre}</td>
            <td>{logement.description}</td>
            <td>{logement.typeLogement}</td>
            <td>{logement.service}</td>
            <td>{logement.photosLogement}</td>
          </tr>             
      )
    });
    return (    
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Rue</th>
              <th>Ville</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Type de Logement</th>
              <th>service</th>
              <th>Photos du logement</th>
            </tr>
          </thead>
          <tbody>
            {logements}
          </tbody>
        </Table>
      </div>    
    );
  }
}
export default Admin;
