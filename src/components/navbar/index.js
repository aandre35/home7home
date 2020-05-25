import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavItem,
} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import FormInscription from '../formInscription';
import SearchBar from '../searchBarNav'
import {Auth} from '../../App.js'
import axios from 'axios';

const API = require("../../API.js")

class MyNavbar extends Component{
  state= {
    modal: false,
    utilisateur: ""
  }
  componentWillMount() {
    if (Auth.isAuthenticated) {
      const urlUtilisateur = `${API.urlUtilisateurs}/${Auth.userid}`
      axios.get(urlUtilisateur).then((response) => {
        console.log(urlUtilisateur)
        const utilisateur= response.data.prenom + " " + response.data.nom
        this.setState({
          utilisateur : utilisateur,
        })
      });      
    } 

  }
  setModal= () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render(){
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home7Home</NavbarBrand>
          <NavbarToggler onClick={this.setModal} />
          <Collapse isOpen={this.state.modal} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/annonces">
                  Annonces
                </NavLink>                
              </NavItem>
              {/*
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Annonces
                </DropdownToggle>
                <DropdownMenu>
                  <Link to="/annonces">
                    <DropdownItem>
                      Toutes catégories
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <Link to="/logements">
                    <DropdownItem>
                      Logements
                    </DropdownItem>
                  </Link>
                  <Link to="/services">
                    <DropdownItem>
                      Services
                    </DropdownItem>
                  </Link>
                  <Link to="/emplois">
                    <DropdownItem>
                      Emplois
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              */}
            </Nav>    
            <Nav className="ml-auto" navbar>
              <SearchBar/>
              {Auth.isAuthenticated &&
              <>
                <NavbarText className="pr-3">
                  {this.state.utilisateur}
                </NavbarText>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FontAwesomeIcon icon={faUser} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/mon-compte">
                      <DropdownItem>
                        Mon compte
                      </DropdownItem>
                    </Link>
                    {Auth.isAdmin &&
                    <Link to="/admin">
                      <DropdownItem>
                        Admin
                      </DropdownItem>
                    </Link>
                    }
                    <DropdownItem divider />
                      <Logout/>

                    {/*                 
                    <Link to="/inscription">
                      <DropdownItem>
                        Inscription
                      </DropdownItem>
                    </Link> 
                    */}
                  </DropdownMenu>
                </UncontrolledDropdown>
                </>
              }

              {!Auth.isAuthenticated && 
              <>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faUser} />
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/login">
                      <DropdownItem>
                        Se connecter
                      </DropdownItem>
                    </Link>
                  <FormInscription buttonLabel="S'inscrire"/>
                  {/*                 
                  <Link to="/inscription">
                    <DropdownItem>
                      Inscription
                    </DropdownItem>
                  </Link> 
                  */}
                </DropdownMenu>
              </UncontrolledDropdown>
              </>
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;

function Logout() {
  //let history = useHistory();
  //let location = useLocation();

  //let { from } = location.state || { from: { pathname: "/" } };
  let logout = () => {
    Auth.signout();
  };

  return (
    <>
      <Link to='/'>
        <DropdownItem onClick={logout}>
          Se déconnecter
        </DropdownItem>       
      </Link>
    </>
  );
}