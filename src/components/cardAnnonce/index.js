import React, { Component } from 'react';
import { CardBody, CardImg,  Card , CardTitle, CardSubtitle, Button} from 'reactstrap';
import {Link} from 'react-router-dom'
import axios from 'axios'
const API = require('../../API.js')

class Cadre extends Component {
  state = {
    type: ""
  }
  componentWillMount() {
    const urlType = `${API.urlAnnonces}/${this.props.id}${API.urlType}`
    axios.get(urlType).then((response) => {
      this.setState({
        type: response.data
      })
    }) 
  }
  render() {
    const {titre, photo, id} = this.props
    const urlAnnonce = `${this.state.type.toLowerCase()}/${id}`
    console.log(urlAnnonce)
    return (
      <Card key={id} className="card-exp">
                  <div className="photo-annonce" style={{backgroundImage: `url(${photo})`}}></div>
        <CardBody>
          <CardTitle>{titre}</CardTitle>
          <CardSubtitle className="text-muted">{this.state.type}</CardSubtitle>
          <Link to={urlAnnonce}>
            <Button>Lire</Button>
          </Link>
        </CardBody>
      </Card>

    );
  };
}

export default Cadre;