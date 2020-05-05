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
import FormInscription from '../formInscription'

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
              <Link to="/logements">
                <NavLink>Logements</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/services">
                <NavLink>Services</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/emplois">
                <NavLink>Emplois</NavLink>
              </Link>
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
                <Modal buttonLabel="Inscription">
                  <FormInscription/>
                </Modal>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;