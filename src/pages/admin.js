import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import {Container, Table, ButtonGroup, Button} from 'reactstrap';
import {Helmet} from "react-helmet";

class Admin extends Component {

  state = {
    listUtilisateursVisible : false,
    listEmploisVisible : false,
    listServicesVisivle : false,
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
                  listUtilisateursVisible : true,
                  listEmploisVisible : false,
                  listServicesVisivle : false,
                  listLogementsVisible : false,
                })}
            >
              Utilisateurs
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listUtilisateursVisible : false,
                  listEmploisVisible : false,
                  listServicesVisivle : false,
                  listLogementsVisible : true,
                })}
            >
              Logements
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listUtilisateursVisible : false,
                  listEmploisVisible : false,
                  listServicesVisivle : true,
                  listLogementsVisible : false,
                })}
            >
              Services
            </Button>
            <Button 
              onClick={() => 
                this.setState({
                  listUtilisateursVisible : false,
                  listEmploisVisible : true,
                  listServicesVisivle : false,
                  listLogementsVisible : false,
                })}
            >
              Emplois
            </Button>
          </ButtonGroup>
          {this.state.listUtilisateursVisible ? <ListUtilisateurs/> : <div></div>}
          {this.state.listEmploisVisible ? <ListEmplois/> : <div></div>}
          {this.state.listLogementsVisible ? <ListLogements/> : <div></div>}
          {this.state.listServicesVisivle ? <ListServices/> : <div></div>}
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
    axios.get('http://localhost:8080/utilisateurs').then((response) => {
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
            <td>{utilisateur.logements.map((logement => `${logement.id} `))}</td>
            <td>{utilisateur.services.map((service => `${service.id} `))}</td>
            <td>{utilisateur.emplois.map((emploi => `${emploi.id} `))}</td>
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
              <th>logements</th>
              <th>services</th>
              <th>emplois</th>
              <th>photo</th>
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

class ListServices extends Component {
  state = {
    services: [],
  }
  componentWillMount() {
    axios.get('http://localhost:8080/services').then((response) => {
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
            <td>{service.utilisateur}</td>
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
              <th>Utilisateur</th>
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
    axios.get('http://localhost:8080/emplois').then((response) => {
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
            <td>{emploi.descriptionPoste}</td>
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
    axios.get('http://localhost:8080/logements').then((response) => {
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
