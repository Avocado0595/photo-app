import './Header.scss';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Nav, Button } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Images from 'constants/images';
import SigninModal from 'features/User/component/signin-modal/signinModal';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/Firebase';
import SignupModal from 'features/User/component/signup-modal/signUpModal';
import {signInActions} from '../../utils/ModalSlice/SignInModalSlice';
import {signUpActions} from '../../utils/ModalSlice/SignUpModalSlice';

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const openSigninModalBtn = useCallback(()=>dispatch(signInActions.openModal()), [dispatch]);
    const openSignupModalBtn = useCallback(()=>dispatch(signUpActions.openModal()), [dispatch]);
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
                                <Button outline color="success" onClick={openSignupModalBtn}>Sign Up</Button>
                                <SignupModal/>
                                </NavItem>
                                <NavItem>
                                <Button color="primary" onClick={openSigninModalBtn}>Sign In</Button>
                                <SigninModal/>
                                </NavItem>
                            </>
                    }
                </Nav>
            </Collapse>
        </Navbar>

    );
}

export default Header;
