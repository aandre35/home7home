import React, { Component } from 'react';
import { Media, Row, Col, Card } from 'reactstrap';
import {Link} from 'react-router-dom'

class Cadre extends Component {
  render() {
    const {titre, description, photo, url} = this.props
    const smallDescription = description.substr(0,200) 
    return (
      <Card className="mb-5 shadow">
        <Row>
          <Col lg="4">
            <Link to={url}>
              <img style={{width:"100%"}}src={photo} alt={titre}/>
            </Link>
          </Col>
          <Col lg="8">
            <div className="p-2 text-justify">
            <Link to={url}>
              <Media heading>
                {titre}
              </Media>
            </Link>
              {smallDescription}{'...'}
            </div>
          </Col>
        </Row>        
      </Card>

    );
  };
}

export default Cadre;