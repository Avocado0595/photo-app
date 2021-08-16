import React, { useState } from 'react';
import {auth} from '../../../firebase/Firebase';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Button, Spinner } from 'reactstrap';
import * as yup from 'yup';
import InputField from 'custom-fields/InputField';
import './Signin.scss';


function Signup(props) {
    const {toggleModal} = props;
    const validationSchema = yup.object().shape({
        email:yup.string().required('This field is required').email(),
        password: yup.string().required('This field is required').min(6,'Password at least 6 character')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
        confirmPassword: yup.string().required('This field is required').min(6,'Password at least 6 character')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.')
    });
    const initialValues = {
        email:'',
        password:'',
        confirmPassword:''
    }
    const [account, setAccount] = useState(initialValues);
   
    const handleSubmit = async(values)=>{
        const {email, password, confirmPassword} = values;
        if (password !== confirmPassword){
            alert("password don't match");
            return;
        }
        
        try{
            await auth.createUserWithEmailAndPassword(email, password);
            setAccount({email:'', password:'',confirmPassword:''});
        }
        catch(err){
            console.log('Sign up fail: ', err.message);
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
                            <FastField 
                                name="confirmPassword"
                                type="password"
                                component={InputField}
                                label="Confirm Password"
                            />
                            <br/>
                            <FormGroup className="signin-btn-group">
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} Sign Up</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
        </div>
    );
}

export default Signup;