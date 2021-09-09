import React from 'react';
import {Button} from 'reactstrap';
import Images from '../../constants/images';
import "./GoogleBtn.scss";
import { singInWithGoogle } from '../../firebase/Firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';

import { setCurrentUser } from 'features/User/UserSlice';
import createUser from 'utils/Tools/createUser';
import userApi from 'api/userApi';

function GoogleButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleOnClick = async ()=>{
        const loginUser = await singInWithGoogle();
        const databaseUser = await userApi.getOne(loginUser.uid); 
        const userObj = {displayName:loginUser.user.displayName, uid: loginUser.user.uid, photoURL: loginUser.user.photoURL, email: loginUser.user.email};
        await createUser(userObj); 
        dispatch(setCurrentUser(userObj, databaseUser));
        dispatch(signInActions.closeModal());
        history.push('/');
    }
    return (
        <Button onClick={handleOnClick} type="button" color="primary" className="google-btn" > <div className="google-btn__layout"><img alt="google" className="small-icon google-icon" src={Images.google}/></div> Sign in with Google</Button>
    );
}

export default GoogleButton;