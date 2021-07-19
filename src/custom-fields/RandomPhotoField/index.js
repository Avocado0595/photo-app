import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import RandomPhoto from 'components/RandomPhoto';
import { ErrorMessage } from 'formik';

RandomPhotoField.propTypes = {
    field: PropTypes.object,
    label: PropTypes.string
};

function RandomPhotoField(props) {
    const {field, form, label} = props;
    const {name, value, onBlur} = field;
    const {errors, touched} = form;
    const showErr = errors[name] && touched[name];
    const handleImageUrlChange = (newImageUrl)=>{
        form.setFieldValue(name, newImageUrl)
    }
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <RandomPhoto
                name={name}
                imageUrl={value}
                onImgUrlChange={handleImageUrlChange}
                onRandomBtnBlur={onBlur}
                className={showErr?'is-invalid':''}
            />
             <ErrorMessage name={name} component={FormFeedback}/>
        </FormGroup>
    );
}

export default RandomPhotoField;