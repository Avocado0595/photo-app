import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { ErrorMessage } from 'formik';
import checkImgURL from 'utils/Tools/checkImgURL';
import './PhotoField.scss';
import Images from 'constants/images';
PhotoField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

PhotoField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false
}

function PhotoField(props) {

    const { form, field, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur  } = field;
    const { errors, touched } = form;
    const showErr = errors[name] && touched[name];
    const [errImgUrl, setErrImgUrl] = useState(false);
    const [imgUrl, setImgUrl] = useState(value);
    const handleError = () => {
        setImgUrl(Images.noPreview);
    }
    const handlePreviewBtn = async() => {
        const isValidImgURL = await checkImgURL(value);
        if(isValidImgURL)
        {
            setImgUrl(value);
            setErrImgUrl(false);
        }
            else{
                setImgUrl('');
                setErrImgUrl(true);
                showErr=true;
            }
      
    }

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
            <ErrorMessage name={name} component={FormFeedback} />
            {errImgUrl?<span style={{color: '#dc3545', fontSize: '0.875em'}}>Invalid image url</span>:null}
            <div className="preview-box">
                <Button onClick={handlePreviewBtn} size="sm" type="button">Preview</Button>
                <br />
                <img alt="preview" src={imgUrl} className="preview-img" onError={handleError} />
            </div>
        
        </FormGroup>
    );
}

export default PhotoField;