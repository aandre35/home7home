import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import {Container, Table} from 'reactstrap';

class Admin extends Component {
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
    let utilisateurs = this.state.users.map((utilisateur) => {
      return (
        <tr>
            <th scope="row">{utilisateur.id}</th>
            <td>{utilisateur.prenom}</td>
            <td>{utilisateur.nom}</td>
            <td>{utilisateur.mail}</td>
            <td>{utilisateur.password}</td>
            <td>{utilisateur.logements}</td>
            <td>{utilisateur.services}</td>
            <td>{utilisateur.emplois}</td>
            <td>{utilisateur.photoUtilisateur}</td>
          </tr>             
      )
    });
    const titre = "Admin";
    const description = "Liste des utilisateurs";
    return (
      <div>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
        <Container>
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
        </Container>
        
      </div>
    )

  }
}

export default Admin;
