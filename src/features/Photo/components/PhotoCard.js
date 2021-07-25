import React from 'react';
import { useDispatch } from 'react-redux';

import './PhotoCard.scss';



function PhotoCard(props) {
    const {photo, handleEditPhoto, handleRemovePhoto} = props;
    const {imgUrl, title, id} = photo;
    const onEditClick = ()=>{
        if (handleEditPhoto) handleEditPhoto(photo);
    }
    const onRemoveClick = ()=>{
        if (handleRemovePhoto) handleRemovePhoto(photo);
    }
    return (
        <div key={id} className="photo-card col-md-4 col-sm-6 col-xs-6">
            <div className="photo-card__img-layout" >
                <img className="photo-card__img" src={imgUrl} alt={title}/>
            </div>
           
            <div className="photo-card__modal">
                <div className="photo-card__modal__title"><h4 className="photo-card__title">{title}</h4></div>
                <div className="photo-card__modal__control">
                    <button onClick={onEditClick} className="control__btn edit">Edit</button>
                    <button onClick={onRemoveClick} className="control__btn remove">Remove</button>
                </div>
                
            </div>
        </div>
    );
}
//

export default PhotoCard;