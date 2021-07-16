import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import photoCategory from 'constants/photoCategory';

import Images from 'constants/images';
import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';

PhotoForm.propTypes = {
    
};

function PhotoForm(props) {
    const initValue = {
        title:'',
        categoryId:null,
    }
    return (
        <Formik initialValues={initValue}>
            {
                formikProps =>{
                    const {values, errors, touched} = formikProps;
                    console.log({values});
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

                            <FormGroup>
                                <Label for="photo">Photo</Label>
                                <div><Button type="button" outline color="primary">Random a photo</Button>
                                    <div>
                                        <img width="200px" height="200px" src={Images.banner3} alt='random-photo' />
                                    </div>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary">Add to album</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
 
    );
}

export default PhotoForm;