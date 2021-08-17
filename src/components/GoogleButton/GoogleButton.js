import React from 'react';
import {Button} from 'reactstrap';
import Images from '../../constants/images';
import "./GoogleBtn.scss";
import { singInWithGoogle } from '../../firebase/Firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';
function GoogleButton(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleOnClick = async ()=>{
        await singInWithGoogle();
        history.push('/');
        dispatch(signInActions.closeModal());
    }
    return (
        <Button onClick={handleOnClick} type="button" color="primary" className="google-btn" > <div className="google-btn__layout"><img alt="google" className="small-icon google-icon" src={Images.google}/></div> Sign in with Google</Button>
    );
}

export default GoogleButton;