import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Button, Spinner } from 'reactstrap';
import * as yup from 'yup';
import InputField from 'custom-fields/InputField';
import './Signin.scss';
import GoogleButton from 'components/GoogleButton/GoogleButton';

Signin.propTypes = {
    
};
const initialValues = {
    email:'',
    password:''
}

function Signin(props) {
    const {toggleModal} = props;
    const validationSchema = yup.object().shape({
        email:yup.string().required('This field is required').email(),
        password: yup.string().required()
    })
    return (
        <div className="signin-form">
               <Formik initialValues={initialValues}
            onSubmit={props.onSubmit}
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
                            />

                            <FastField 
                                name="password"
                                type="password"
                                component={InputField}
                                label="Password"
                            />
                            <br/>
                            <FormGroup className="signin-btn-group">
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} Sign In</Button>
                                <GoogleButton toggleSignIn = {toggleModal}/>
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