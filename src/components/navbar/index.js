import React, { useState, Component } from 'react';
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
} from 'reactstrap';
import {Link, useHistory, useLocation, Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import FormConnexion from '../modalFormConnexion'
import FormInscription from '../modalFormInscription';
import SearchBar from '../searchBarNav'
import {Auth} from '../../App.js'

class MyNavbar extends Component{
  state= {
    modal: false,
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
              {/* 
              <NavItem>
                <NavLink href="/logements">Logements</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/services">Services</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/emplois">Emplois</NavLink>
              </NavItem>
              */}
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

              <NavbarText>
              Authentifié : { String(Auth.isAuthenticated)}{' '}{ ", id de l'utilisateur : "}{Auth.userid}
              </NavbarText>
            </Nav>
            <Nav className="ml-auto" navbar>
              <SearchBar/>
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
                  <Link to="/admin">
                    <DropdownItem>
                      Admin
                    </DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  {!Auth.isAuthenticated &&
                  <Link to="/login">
                    <DropdownItem>
                      Se connecter
                    </DropdownItem> 
                  </Link>
                  }
                  {Auth.isAuthenticated &&
                    <Logout/>
                  } 
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