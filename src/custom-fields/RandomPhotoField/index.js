import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import RandomPhoto from 'components/RandomPhoto';

RandomPhotoField.propTypes = {
    field: PropTypes.object,
    label: PropTypes.string
};

function RandomPhotoField(props) {
    const {field, form, label} = props;
    const {name, value, onBlur} = field;

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
            />
        </FormGroup>
    );
}

export default RandomPhotoField;