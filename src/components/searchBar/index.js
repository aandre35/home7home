import React, { useState, Component } from 'react';
import {
  Container, Label, Input,
} from 'reactstrap';
import {Link} from 'react-router-dom'

class Annonces extends Component {
  state= {
    annonces: [],
    annonce:{},
    isAnnonceView: false,
    sortValue: '',
    inputValue: ''
  }

  render() {
    return(
      <SearchBar inputValue={this.state.inputValue}/>
    )
  }

}

const SearchBar = (props) =>  {
  return(
    <div>
      <Container>
        <Label for="search"/>Chercher une annonce<Label/>
        <Input 
          id="search"
          type="text"
          onChange={props.inputValue}
        />
      </Container>
    </div>
  )
}

export default SearchBar