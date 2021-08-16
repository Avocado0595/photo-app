import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';

PhotoField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

PhotoField.defaultProps={
    type:'text',
    label:'',
    placeholder: '',
    disabled: false
}

function PhotoField(props) {
    const {form, field,type,label,placeholder ,disabled} = props;
    const {name, value, onChange, onBlur} = field;
    const {errors, touched} = form;
    const showErr = errors[name] && touched[name];
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Input name={name} id={name} value={value} 
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            invalid={showErr}
            />
            <ErrorMessage name={name} component={FormFeedback}/>
        </FormGroup>
    );
}

export default PhotoField;