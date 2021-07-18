import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';
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
    const {field,options,label, placeholder ,disabled} = props;
    const {name, value} = field;
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
            <Select id={name} {...field}
            value={selectedOption}
            onChange={handleSelectOptionChange}
            placeholder={placeholder}
            isDisabled={disabled}
            options={options}
             />
        </FormGroup>
    );
}

export default SelectField;