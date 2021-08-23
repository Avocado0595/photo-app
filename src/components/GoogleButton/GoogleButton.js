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

function GoogleButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleOnClick = async ()=>{
        const loginUser = await singInWithGoogle();
        const userObj = {displayName:loginUser.user.displayName, uid: loginUser.user.uid};
        history.push('/');
        dispatch(signInActions.closeModal());
        dispatch(setCurrentUser(userObj));
        await createUser(userObj); 
    }
    return (
        <Button onClick={handleOnClick} type="button" color="primary" className="google-btn" > <div className="google-btn__layout"><img alt="google" className="small-icon google-icon" src={Images.google}/></div> Sign in with Google</Button>
    );
}

export default GoogleButton;