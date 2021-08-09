import Images from 'constants/images';
import React, { useState } from 'react';
import './PhotoCard.scss';


function PhotoCard(props) {
    const [showPhotoModel, setShowPhotoModel] = useState(false);
    const {photo, handleEditPhoto, handleRemovePhoto} = props;
    const {imgUrl, title, id} = photo;
    const onEditClick = ()=>{
        if (handleEditPhoto) handleEditPhoto(photo);
    }
    const onRemoveClick = ()=>{
        if (handleRemovePhoto) handleRemovePhoto(photo);
    }
    return (
         
        <div className="row">
            <div className="col-md-12 px-0">
                <div className="photo-card rounded-lg overflow-hidden">
                <div className="modal-group">
                            <button className="control__btn"><img className="control__btn--img" src={Images.like} /></button>
                            <button className="control__btn"><img className="control__btn--img" src={Images.plus} /></button>
                        </div>
                    <img src={imgUrl} className="img-fluid " alt='alt'></img>
                    <div className="modal-group author">
                            <a href="/">
                                <img alt="avatar" />
                                <p>author's name</p>

                            </a>
                        </div>
                    <div className="photo-card__modal">
                        
                       
                    </div>
                </div>
            </div>
        </div>
           
           
           
        // </div>
    );
     // <div key={id} className="photo-card col-md-4 col-sm-6 col-xs-6">
        //     <div className="photo-card__img-layout" >
        //         <img className="photo-card__img" src={imgUrl} alt={title}/>
        //     </div>
}
//

export default PhotoCard;