import React, { useState, Component } from 'react';
import {
  Form, FormGroup, Label, Input, Button, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
const API = require('../../API.js')

class SearchBar extends Component {
  state= {
    annonces: [],
    annonce:{},
  }

  handleChange = (event) => {
    const endUrl = `?search=titre:*${event.target.value}*`;
    const url = `${API.urlAnnoncesSearch}${endUrl}`;
    console.log(url);
    axios.get(url)
      .then((response) => {
        this.setState(
          {
            annonces: response.data
          }
        )
        console.log(this.state)
      } 
    )

  }

  render() {
    return(
      <>
        <Form inline>
          <FormGroup>
            <Input 
              id="search"
              type="text"
              placeholder="Chercher une annonce"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Link to='/annonces'>
            <Button color="info">
              <FontAwesomeIcon icon={faSearch}/>
            </Button>          
          </Link>   
        </Form>
      </>
    )
  }
}

export default SearchBar