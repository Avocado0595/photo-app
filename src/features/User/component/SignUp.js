import React from 'react';
import {auth} from '../../../firebase/Firebase';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Button, Spinner } from 'reactstrap';
import * as yup from 'yup';
import InputField from 'custom-fields/InputField';
import './Signin.scss';
import {errorActions} from 'utils/ModalSlice/ErrorModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from './errorModal/ErrorModal';
import { setCurrentUser } from '../UserSlice';
import { signUpActions } from 'utils/ModalSlice/SignUpModalSlice';
import { signInActions } from 'utils/ModalSlice/SignInModalSlice';
import createUser from 'utils/Tools/createUser';

function Signup() {
    const dispatch = useDispatch();
    const open = useSelector(state=>state.ErrorToggle.isOpen);
    const validationSchema = yup.object().shape({
        email:yup.string().required('This field is required').email(),
        password: yup.string().required('This field is required').min(6,'Password at least 6 character')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
        confirmPassword: yup.string().required('This field is required').min(6,'Password at least 6 character')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.')
    });
    const initialValues = {
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    
    const switchSignIn = ()=>{
        dispatch(signUpActions.closeModal());
        dispatch(signInActions.openModal());
    }

    const handleSubmit = async(values)=>{
        const {displayName, email, password, confirmPassword} = values;
        if (password !== confirmPassword){
            dispatch(errorActions.openModal("Confirm password doesn't match"));
            return;
        }
        try{
            const newUser = await auth.createUserWithEmailAndPassword(email, password);
            await newUser.user.updateProfile({
                displayName: displayName
            });
            const userObj = {displayName:newUser.user.displayName, uid: newUser.user.uid, photoURL: newUser.user.photoURL};
            dispatch(setCurrentUser(userObj));
            await createUser(userObj);
        }
        catch(err){
           dispatch(errorActions.openModal(err.message)); 
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
                                name="displayName"
                                component={InputField}
                                label="Display name"
                                placeholder="Eg: Tom"
                                type="text"
                            />

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
                            <FastField 
                                name="confirmPassword"
                                type="password"
                                component={InputField}
                                label="Confirm Password"
                            />
                            <div className="helper-block">If you already have an account, please <div type="button" onClick={switchSignIn} className="helper-block--click">Sign In here!</div></div>
                            <FormGroup className="signin-btn-group">
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} Sign Up</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>

        <ErrorModal isOpen={open}/>
        </div>
    );
}

export default Signup;