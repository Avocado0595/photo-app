import './Header.scss';
import {Container, Row, Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {
     
};
 
function Header(props) {
     return (
         <header className="header">
             <Container>
                 <Row className="justify-content-between">
                     <Col xs="auto">
                         <a 
                         className="header__link header__title"
                         href="http://www.google.com"
                         target="_blank"
                         rel="noopener noreferrer"
                         >
                             Go google
                         </a>
                     </Col>
                     <Col xs="auto">
                         <NavLink 
                         exact
                         className="header__link"
                         to="/photos"
                         activeClassName="header__link--active"
                         >
                             Redux project
                         </NavLink>
                     </Col>
                 </Row>
             </Container>
         </header>
     );
}
 
export default Header;