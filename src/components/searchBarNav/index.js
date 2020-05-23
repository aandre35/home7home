import React, { Component } from 'react';
import {
  Form, FormGroup, Input, Button} from 'reactstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'

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