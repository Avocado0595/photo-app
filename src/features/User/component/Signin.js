import React, { useState } from 'react';
import {auth} from '../../../firebase/Firebase';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Button, Spinner } from 'reactstrap';
import * as yup from 'yup';
import InputField from 'custom-fields/InputField';
import './Signin.scss';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';
import {signUpActions} from 'utils/ModalSlice/SignUpModalSlice';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../UserSlice';


function Signin(props) {
    const dispatch = useDispatch();
    const switchSignUp = ()=>{
        dispatch(signInActions.closeModal());
        dispatch(signUpActions.openModal());
    }
    const validationSchema = yup.object().shape({
        email:yup.string().required('This field is required').email(),
        password: yup.string().required('This field is required').min(6,'Password at least 6 character')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.')
    });
    const initialValues = {
        email:'',
        password:''
    }
    const [account, setAccount] = useState(initialValues);
   
    const handleSubmit = async (values) => {
        const {email, password} = values;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            dispatch(setCurrentUser(auth.currentUser));
            
        }
        catch(err){
            console.log('login fail: ', err.message);
            setAccount({...account, errMessage: err.message});
        }
    }
    return (
        <div className="signin-form">
               <Formik initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema} 
        >
            {
                formikProps =>{
                    const {isSubmitting} = formikProps;
                    return (
                        <Form>
                            <FastField 
                                name="email"
                                component={InputField}
                                label="Email"
                                placeholder="Eg: email@email.com"
                                type="email"
                            />

                            <FastField 
                                name="password"
                                type="password"
                                component={InputField}
                                label="Password"
                            />
                            <br/>
                            <p>If you don't have any account, please <div type="button" onClick={switchSignUp} className="helper-block">Sign Up here!</div></p>
                        
                            <FormGroup className="signin-btn-group">
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} Sign In</Button>
                                <GoogleButton/>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
        
        </div>
    );
}

export default Signin;