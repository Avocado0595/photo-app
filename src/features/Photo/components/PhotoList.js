import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard';
import {Row} from 'reactstrap';
PhotoList.propTypes = {
    photoList: PropTypes.any,
};
PhotoList.defaultProps ={
    photoList:[],
}

function PhotoList(props) {
    const {photoList, handleEditPhoto, handleRemovePhoto} = props;
    return (
        <div className="container">
            <Row className="gx-5">
            {
                photoList.map((photo, index)=>(
                    <PhotoCard handleRemovePhoto={handleRemovePhoto} handleEditPhoto={handleEditPhoto} photo={photo}/>
                ))
            }
            </Row>
        </div>
    );
}

export default PhotoList;