import React, { Component } from 'react';
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'

class Compte extends Component {
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
    let Holder;
    window.addEventListener('DOMContentLoaded', () => {
      Holder = require('holderjs');
    });
    let users = this.state.users.map((user) => {
      return (
        <tr key={user.idUser}>
          <td>{user.idUser}</td>
          <td>{user.nom}</td>
          <td>{user.prenom}</td>
        </tr>
      )
    });
    const titre = "Mon compte";
    const description = "Bienvenue prenom, vous pouvez ajouter de nouvelles annonces";
    return (
      <div>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
      </div>
    )

  }
}

export default Compte;
