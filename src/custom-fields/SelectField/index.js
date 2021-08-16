import React from 'react';
import PropTypes from 'prop-types';
//import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';
SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

SelectField.defaultProps={
    label:'',
    placeholder: '',
    disabled: false,
    options:[],
}

function SelectField(props) {
    const {form, field,options,label, placeholder ,disabled} = props;
    const {name, value} = field;
    const {errors, touched} = form;
    const showErr = errors[name] && touched[name];
    const selectedOption = options.find(option=>option.value === value);
    const handleSelectOptionChange = (selectOption)=>{
        const selectedValue = selectOption?selectOption.value : selectOption;

        const changeEvent = {
            target:{
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
    }
    return (
        <FormGroup>
             {label && <Label for ={name}>{label}</Label>}
            <CreatableSelect id={name} {...field}
            value={selectedOption}
            onChange={handleSelectOptionChange}
            placeholder={placeholder}
            isDisabled={disabled}
            options={options}
            className={showErr?'is-invalid':''}
             />
             <ErrorMessage name={name} component={FormFeedback}/>
        </FormGroup>
    );
}

export default SelectField;