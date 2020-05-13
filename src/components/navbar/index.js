import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import FormConnexion from '../modalFormConnexion'
import FormInscription from '../modalFormInscription';
import SearchBar from '../searchBarNav'

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home7Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
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
                <FormConnexion buttonLabel= "Se connecter"/>
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

export default MyNavbar;