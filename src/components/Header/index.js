import React, { useCallback, useState } from 'react';
import { Navbar, NavbarToggler, Collapse, NavItem, Nav, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, Link } from 'react-router-dom';
import SigninModal from 'features/User/component/signin-modal/signinModal';
import SignupModal from 'features/User/component/signup-modal/signUpModal';
import AddEditModal from 'features/User/component/AddEditModal/AddEditModal';
import { auth } from '../../firebase/Firebase';
import { signInActions } from '../../utils/ModalSlice/SignInModalSlice';
import { signUpActions } from '../../utils/ModalSlice/SignUpModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { getKeyword } from 'features/Search/SearchSlice';
import './Header.scss';
import Images from 'constants/images';

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user);

    const [isOpen, setIsOpen] = useState(false);
    const [inputKeyword, setInputKeyword] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const openSigninModalBtn = useCallback(() => dispatch(signInActions.openModal()), [dispatch]);
    const openSignupModalBtn = useCallback(() => dispatch(signUpActions.openModal()), [dispatch]);
    const handleAddPhoto = useCallback(() => dispatch(addEditActions.openAddModal()), [dispatch]);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggle = () => setIsOpen(!isOpen);
    const handleSearchBtnClick = () => {
        if (inputKeyword.trim() === '')
            return;
        dispatch(getKeyword(inputKeyword));
        history.push(`/search/${inputKeyword}`);
        setInputKeyword('');
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            handleSearchBtnClick();
    }
    return (
        <Navbar color="light" light expand="lg" sticky="top">
            <NavLink to="/photos" className="nav-brand"><img alt="logo" className="header__logo" src={Images.logo} /> <p className="header__text">Photo Gallery</p></NavLink>
            <div className="nav-search">
                <input onKeyDown={handleKeyDown} value={inputKeyword} onChange={(e) => { setInputKeyword(e.target.value) }} className="nav-search__input bg-light" type="text" placeholder="Search your favorite photo..." />
                <button onClick={handleSearchBtnClick} className="nav-search__btn bg-light"><img alt="search" className="nav-search__btn--icon" src={Images.searchIcon} /></button>
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
                        currentUser.currentUser ?
                            <>
                                <NavItem> <div className="submitphoto-div" onClick={handleAddPhoto}>Submit a photo</div></NavItem>
                                <NavItem>
                                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle className="avatar-btn">
                                            <img alt="avatar" className="avatar-img mid-icon" src={currentUser.currentUser.photoURL ? currentUser.currentUser.photoURL : Images.user} />
                                        </DropdownToggle>
                                        <DropdownMenu className="user-menu">
                                            <DropdownItem><Link className="user-item" to={`/${currentUser.currentUser.uid}`}>Profile</Link></DropdownItem>
                                            <DropdownItem><NavLink className="user-item" to={`/edit/${currentUser.currentUser.uid}`}>Account setting</NavLink></DropdownItem>
                                            <DropdownItem><div className="signout-div" onClick={async () => {
                                                await auth.signOut();
                                                history.push('/');
                                                localStorage.clear('firebaseToken');
                                            }}>Log out</div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </NavItem>
                            </>
                            :
                            <>
                                <NavItem>
                                    <Button size="sm" outline color="success" onClick={openSignupModalBtn}>Sign Up</Button>
                                    <SignupModal />
                                </NavItem>
                                <NavItem>
                                    <Button size="sm" color="primary" onClick={openSigninModalBtn}>Sign In</Button>
                                    <SigninModal />
                                </NavItem>
                            </>
                    }
                </Nav>
            </Collapse>
            {currentUser.currentUser ? <AddEditModal /> : null}
        </Navbar>

    );
}

export default Header;
