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
import Modal from '../modal'
import FormConnexion from '../formConnexion'
import FormInscription from '../modalFormInscription';

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
            <NavItem>
              <NavLink href="/logements">Logements</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/services">Services</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/emplois">Emplois</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
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
                <Modal buttonLabel="Connexion">
                  <FormConnexion/>
                </Modal>
                <FormInscription buttonLabel="S'inscire"/>
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