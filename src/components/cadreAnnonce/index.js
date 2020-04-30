import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Cadre extends Component {
  componentWillMount() {
    let Holder;
    window.addEventListener('DOMContentLoaded', () => {
      Holder = require('holderjs');
    });
  }
  render() {
    return (
      <Media className="mb-5">
        <Media left href="#" className="pr-4">
          <Media 
            object 
            data-src="holder.js/128x128"
            alt="Generic placeholder image" 
          />
        </Media>
        <Media body>
          <Media heading>
            Media heading
          </Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
    );
  };
}

export default Cadre;