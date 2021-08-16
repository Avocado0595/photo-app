import React from 'react';
import {Button} from 'reactstrap';
import Images from '../../constants/images';
import "./GoogleBtn.scss";
import { singInWithGoogle } from '../../firebase/Firebase';
import { useHistory } from 'react-router-dom';

function GoogleButton(props) {
    const history = useHistory();
    const {toggleSignIn} = props;

    const handleOnClick = async ()=>{
        await singInWithGoogle();
        if(toggleSignIn)
            toggleSignIn();
        history.push('/');
    }
    return (
        <Button onClick={handleOnClick} type="button" color="primary" className="google-btn" > <div className="google-btn__layout"><img alt="google" className="small-icon google-icon" src={Images.google}/></div> Sign in with Google</Button>
    );
}

export default GoogleButton;