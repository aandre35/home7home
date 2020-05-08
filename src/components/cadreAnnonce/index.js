import React, { Component } from 'react';
import { Media } from 'reactstrap';
import {Link} from 'react-router-dom'

class Cadre extends Component {
  componentWillMount() {
    let Holder;
    window.addEventListener('DOMContentLoaded', () => {
      Holder = require('holderjs');
    });
  }
  render() {
    const {titre, description, photo, url} = this.props
    //const smallDescription = description.substr(0,100) 
    return (
      <Media className="mb-5">
        <Media left href={url} className="pr-4">
          <Media 
            object 
            data-src="holder.js/128x128"
            alt="Generic placeholder image" 
          />
        </Media>
        <Media body >
          <Link to={url}>
            <Media heading>
              {titre}
            </Media>
          </Link>
          {description}
        </Media>
      </Media>
    );
  };
}

export default Cadre;