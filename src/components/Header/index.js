import './Header.scss';
import {Container, Row, Col} from 'reactstrap';
import {NavLink, Link} from 'react-router-dom';
import React from 'react';
import Images from 'constants/images';

function Header(props) {
     return (
         <header className="header">
             <Container fluid>
                 <Row className="justify-content-between">
                 <Col xs="auto">
                         <NavLink 
                         exact
                         className="header__link"
                         to="/photos"
                         activeClassName="header__link--active"
                         >
                            <img className="header__logo" src={Images.logo}/> PHOTO GALLERY
                         </NavLink>
                     </Col>
                     <Col xs="auto">
                     <Link className="header__add-photo" to='/photos/add'> Add new photo <img className="header__logo--add" src={Images.add}/></Link>
                     </Col>                
                 </Row>
             </Container>
         </header>
     );
}
 
export default Header;