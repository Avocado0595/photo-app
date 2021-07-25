import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Spinner } from 'reactstrap';
import photoCategory from 'constants/photoCategory';
import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import './PhotoForm.scss';
PhotoForm.propTypes = {
    title: PropTypes.string,
    categoryId: PropTypes.string,
    imgUrl: PropTypes.string
};

function PhotoForm(props) {
    const {initialValues} = props; 
    const {photoId} = useParams();
    const isAddPhoto = !photoId;
    const validationSchema = yup.object().shape({
        title:yup.string().required('This field is required'),

        categoryId: yup.number().required('This field is required').nullable(),

        imgUrl: yup.string().required('This field is required')
    })
    return (
        <div className="form-layout">
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
                                name="imgUrl"
                                component={RandomPhotoField}
                                label="Photo"
                            />
                            <FormGroup>
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} {isAddPhoto?"Add to album":"Save your change"}</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
        </div>
     
 
    );
}

export default PhotoForm;