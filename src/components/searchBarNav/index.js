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
    endUrl:''
  }

  handleChange = (event) => {
    this.setState({
      endUrl : `titre:*${event.target.value}*`
    })
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
          <Link to={`/results/${this.state.endUrl}`}>
            <Button color="dark">
              <FontAwesomeIcon icon={faSearch}/>
            </Button>          
          </Link>   
        </Form>
      </>
    )
  }
}

export default SearchBar