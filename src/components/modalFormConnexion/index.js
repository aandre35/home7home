import React, { Component, useEffect } from 'react';
import { Button,Card,
  Form, FormGroup, Label, Input, FormText, Container, Row, CardHeader, CardBody, CardFooter} from 'reactstrap';
import axios from 'axios'
import API from '../../API.js'
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom'
import {Auth} from '../../App.js'

class FormConnexion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
      redirect: false,
    }
  }
  login = () => {
    Auth.authenticate(() => {});
  }
  setRedirect =() => {
    this.setState({
      redirect: !this.state.redirect,
    })
  }
  renderRedirect = () => {
    if(this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.state.location }
          }}
        />
      );
    }
  }
  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      }
    )
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault();
    const url = `${API.urlUtilisateurs}${API.urlConnexion}?mail=${this.state.email}&password=${this.state.password}`
    console.log(url)
    axios.get(url)
      .then((response) => {
        console.log(response)
        Auth.authenticate(response.data)
        this.setRedirect()
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: error.response.data.message
        });
      })
  }

  render() {
    const buttonLabel = "Connexion"
    const {email, password} =this.state;
    return (
      <div>
        {this.renderRedirect()}
        <Container style={{height: "100vh"}}className="d-flex">
          <Row className="align-items-center mx-auto">
            <Card style={{width: "30vw", minWidth:"300px"}}>
            <Form onSubmit={this.handleSubmit}>
              <CardHeader>{buttonLabel}</CardHeader>
              <CardBody>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                      type="email" 
                      name="email" 
                      value={email}
                      id="email" 
                      placeholder="email"
                      onChange={this.handleChange} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input 
                      type="password" 
                      name="password" 
                      value={password}
                      id="password" 
                      placeholder="mot de passe" 
                      onChange={this.handleChange} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormText>
                      {this.state.error}
                    </FormText>
                  </FormGroup>
              </CardBody>
              <CardFooter className="text-right">
                <Button color="primary" type="submit">{buttonLabel}</Button>{' '}
                <Link to="/">
                  <Button color="secondary">Annuler</Button>
                </Link>
              </CardFooter>
              </Form>
            </Card>
          </Row>
        </Container>
      </div>
    );
  };
}

export default FormConnexion
