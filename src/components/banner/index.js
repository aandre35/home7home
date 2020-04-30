import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Banner = (props) => {
  return (
    <div>
      <Jumbotron>
        <Container>
          <h1 className="display-3">Jumbotron</h1>
          <p className="lead">This is a jumbotron.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Banner;