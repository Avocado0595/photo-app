import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import Select from 'react-select';
import removeAccents from 'utils/Tools/handleViString';
import AsyncCreatableSelect  from 'react-select/creatable';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';
import {  useSelector } from 'react-redux';



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
    const {form, field,label, placeholder ,disabled} = props;
    const {name, value} = field;
    const {errors, touched} = form;
    const showErr = errors[name] && touched[name];
    const options = useSelector(state=>state.collection.collections);
    const [newOptions, setNewsOptions] = useState([...options]);
    
    const selectedOption = newOptions?newOptions.find(option=>option.value === value):null;


    const handleSelectOptionChange = (selectOption)=>{
        const selectedValue = selectOption?selectOption.value : selectOption;
        const changeEvent1 = {
            target:{
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent1);
        const changeEvent2 = {
            target:{
                name: 'categoryName',
                value: selectOption.label
            }
        };
        field.onChange(changeEvent2);
    }
    const createOption = (value) => ({
        label: value,
        value: removeAccents(value.toLowerCase().replace(/ /g,'')),
      });
    const handleCreate = (inputValue)=>{
        const newOption = createOption(inputValue);
         setNewsOptions([...newOptions, newOption]);
         handleSelectOptionChange(newOption);   
    }
    return (
        <FormGroup>
             {label && <Label for ={name}>{label}</Label>}
            
            <AsyncCreatableSelect id={name}
            value={selectedOption}
            placeholder={placeholder}
            isDisabled={disabled}
            options={newOptions}
            className={showErr?'is-invalid':''}
            onChange={handleSelectOptionChange}
            onCreateOption={handleCreate}
             />
             <ErrorMessage name={name} component={FormFeedback}/>
        </FormGroup>
    );
}

export default SelectField;