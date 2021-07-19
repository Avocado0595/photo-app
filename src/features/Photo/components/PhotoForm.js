import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button } from 'reactstrap';
import photoCategory from 'constants/photoCategory';
import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as yup from 'yup';

PhotoForm.propTypes = {
    title: PropTypes.string,
    categoryId: PropTypes.string,
    photo: PropTypes.string
};

function PhotoForm(props) {
    const initValue = {
        title:'',
        categoryId:null,
        photo:''
    }
    const validationSchema = yup.object().shape({
        title:yup.string().required('This field is required'),

        categoryId: yup.number().required('This field is required').nullable(),

        photo: yup.string().required('This field is required')
    })
    return (
        <Formik initialValues={initValue}
            onSubmit={(values)=> console.log(values)}
            validationSchema={validationSchema}
        >
            {
                formikProps =>{
                    return (
                        <Form>
                            <FastField
                                name="title"
                                component={InputField}

                                label="Title"
                                placeholder="Eg: input..."
                            />

                            <FastField
                                name="categoryId"
                                component={SelectField}

                                label="Photo Category"
                                placeholder="Choose your category..."
                                options = {photoCategory}
                            />
                            <FastField
                                name="photo"
                                component={RandomPhotoField}
                                label="Photo"
                            />
                            <FormGroup>
                                <Button type="submit" color="primary">Add to album</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
 
    );
}

export default PhotoForm;