import { Navbar, NavbarToggler, Collapse, NavItem, Nav, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, useHistory, Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Images from 'constants/images';
import SigninModal from 'features/User/component/signin-modal/signinModal';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/Firebase';
import SignupModal from 'features/User/component/signup-modal/signUpModal';
import {signInActions} from '../../utils/ModalSlice/SignInModalSlice';
import {signUpActions} from '../../utils/ModalSlice/SignUpModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import './Header.scss';
import AddEditModal from 'features/User/component/AddEditModal/AddEditModal';

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const openSigninModalBtn = useCallback(()=>dispatch(signInActions.openModal()), [dispatch]);
    const openSignupModalBtn = useCallback(()=>dispatch(signUpActions.openModal()), [dispatch]);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const handleAddPhoto = useCallback(() => {
        dispatch(addEditActions.openAddModal());
    }, [dispatch]);
    const [dropdownOpen, setOpen] = useState(false);

    const toggleDropdown = () => setOpen(!dropdownOpen);

    return (
        <Navbar color="light" light expand="lg" sticky="top">
            <NavLink to="/photos" className="nav-brand"><img alt="logo" className="header__logo" src={Images.logo} /> <p className="header__text">Photo Gallery</p></NavLink>
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
                            {/* <div className="popup-user-menu">
                            <NavItem>
                                    <div className="signout-div" onClick={handleAddPhoto}>Submit a photo</div>
                                </NavItem>
                            <NavItem>
                                    <div className="signout-div" onClick={() => {
                                        auth.signOut();
                                        localStorage.clear('firebaseToken');
                                        history.push('/');
                                    }}>Sign Out</div>
                                </NavItem>
                            </div> */}
                            
                                <NavItem> <div className="submitphoto-div" onClick={handleAddPhoto}>Submit a photo</div></NavItem>
                                <NavItem>    
                                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle className="avatar-btn">
                                            <img className="avatar-img mid-icon" src={currentUser.photoURL?currentUser.photoURL:Images.user}/>
                                        </DropdownToggle>
                                        <DropdownMenu className="user-menu">
                                            <DropdownItem><Link className="user-item" to={`/${currentUser.uid}`}>Profile</Link></DropdownItem>
                                            <DropdownItem><NavLink className="user-item" to="/">Account setting</NavLink></DropdownItem>
                                            <DropdownItem><div className="signout-div" onClick={async() => {
                                        await auth.signOut();
                                        history.push('/');
                                        localStorage.clear('firebaseToken');
                                    }}>Log out</div></DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
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
           {currentUser?<AddEditModal />:null}
        </Navbar>

    );
}

export default Header;
