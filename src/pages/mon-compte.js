import React, { Component } from 'react';
import logo from './logo.svg';
import {Table, Button} from 'reactstrap'
import axios from 'axios'
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import Cadre from '../components/cadreAnnonce'
import Connexion from '../components/connexion'
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  state = {
    users: []
  }
  componentWillMount() {
    axios.get('http://localhost:8080/projet_applis_web/rest/listutilisateurs').then((response) => {
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

    return (
      <div>
        <MyNavbar></MyNavbar>
        <Banner></Banner>
      </div>
    )

  }
}

export default App;
