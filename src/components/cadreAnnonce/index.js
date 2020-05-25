import React, { Component } from 'react';
import { Media, Row, Col, Card } from 'reactstrap';
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
    const {titre, description, photo, id} = this.props
    const smallDescription = description.substr(0,200) 
    const urlAnnonce = `/${this.state.type.toLowerCase()}/${id}`
    console.log(urlAnnonce)
    return (
      <Card className="mb-5 shadow">
        <Row>
          <Col sm="4">
            <Link to={urlAnnonce}>
              <div className="photo-annonce" style={{backgroundImage: `url(${photo})`}}></div>
            </Link>
          </Col>
          <Col sm="8">
            <div className="p-2 text-justify">
              <Link to={urlAnnonce}>
                <Media heading>
                  {titre}
                </Media>
              </Link>
              <div className="text-muted pb-2">
                {this.state.type}
              </div>
              {smallDescription}{'...'}
            </div>
            
          </Col>
        </Row>        
      </Card>

    );
  };
}

export default Cadre;