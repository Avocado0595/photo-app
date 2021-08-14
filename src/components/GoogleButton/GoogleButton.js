import React from 'react';
import {Button} from 'reactstrap';
import Images from '../../constants/images';
import "./GoogleBtn.scss";
import { singInWithGoogle } from '../../firebase/Firebase';

function GoogleButton(props) {
    const {toggleSignIn} = props;

    const handleOnClick = ()=>{
        singInWithGoogle();
        if(toggleSignIn)
            toggleSignIn();
    }
    return (
        <Button onClick={handleOnClick} type="button" color="primary" className="google-btn" > <div className="google-btn__layout"><img className="small-icon google-icon" src={Images.google}/></div> Sign in with Google</Button>
    );
}

export default GoogleButton;