import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Banner = ({titre, description}) => {
  return (
    <div>
      <Jumbotron>
        <Container>
          <h1 className="display-3">{titre}</h1>
          <p className="lead">{description}</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Banner;