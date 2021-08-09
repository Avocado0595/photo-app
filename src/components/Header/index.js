import './Header.scss';
import {Container, Row, Col, Navbar, NavbarBrand,InputGroup,
    Input, InputGroupAddon, InputGroupText, NavbarToggler, Collapse,
    NavItem, Nav, NavbarText
 } from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import React, {useState} from 'react';
import Images from 'constants/images';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
     return (
         <Container fluid className="header">
             <Navbar color="light" light expand="md">
                 <NavbarBrand href="/photos"><img alt="logo" className="header__logo" src={Images.logo}/> Photo Gallery</NavbarBrand>
                 <div className="nav-search">
                 <input className="nav-search__input bg-light" type="text" placeholder="Search your favorite photo..." />
                    <button className="nav-search__btn bg-light"><img alt="search" className="nav-search__btn--icon" src={Images.searchIcon}/></button>
                 </div>
                 <NavbarToggler onClick={toggle} />
                 <Collapse isOpen={isOpen} navbar>
                     <Nav className="nav-model">
                         <NavItem>
                             <NavLink to="/">Login</NavLink>
                         </NavItem>
                         <NavItem>
                             <NavLink to="/">Sign up</NavLink>
                         </NavItem>
                         <NavItem>
                             <NavLink to="/">About</NavLink>
                         </NavItem>
                         <NavItem>
                             <NavLink to="/">Contact</NavLink>
                         </NavItem>
                     </Nav>
                 </Collapse>
             </Navbar>
         </Container>
     );
}
 
export default Header;
{/* <InputGroup>
                     <Input className="nav-search" placeholder="Search your style..."/>
                     <InputGroupAddon addonType="append">
                         <InputGroupText >Search</InputGroupText>
                     </InputGroupAddon>
                 </InputGroup> */}