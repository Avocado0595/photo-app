import './Header.scss';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Images from 'constants/images';
import SigninModal from 'features/User/component/signin-modal/signinModal';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/Firebase';
import SignupModal from 'features/User/component/signup-modal/signUpModal';

function Header() {
    const history = useHistory();
    const currentUser = useSelector(state => state.user.currentUser);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="light" light expand="lg" sticky="top">
            <NavbarBrand href="/photos"><img alt="logo" className="header__logo" src={Images.logo} /> <p className="header__text">Photo Gallery</p></NavbarBrand>
            <div className="nav-search">
                <input className="nav-search__input bg-light" type="text" placeholder="Search your favorite photo..." />
                <button className="nav-search__btn bg-light"><img alt="search" className="nav-search__btn--icon" src={Images.searchIcon} /></button>
            </div>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="nav-model">
                    <NavItem>
                        <NavLink to="/about">About</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/contact">Contact</NavLink>
                    </NavItem>
                    {
                        currentUser ?
                            <>
                                <NavItem>
                                    <div className="signout-div" onClick={() => {
                                        auth.signOut();
                                        localStorage.clear('firebaseToken');
                                        history.push('/');
                                    }}>Sign Out</div>
                                </NavItem>
                                <NavItem>
                                    <NavLink to={`/${currentUser.uid}`}>{currentUser.displayName}</NavLink>
                                </NavItem>
                            </>
                            :
                            <>
                                <NavItem>
                                    <SignupModal/>
                                </NavItem>
                                <NavItem>
                                    <SigninModal />
                                </NavItem>
                            </>
                    }
                </Nav>
            </Collapse>
        </Navbar>

    );
}

export default Header;
