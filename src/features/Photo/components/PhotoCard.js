import Images from 'constants/images';
import React, { useState } from 'react';
import './PhotoCard.scss';
import {auth} from '../../../firebase/Firebase';
import MyModal from 'features/User/component/modal/MyModal';

function PhotoCard(props) {

    const [modal, setModal] = useState(false);
    const toggle = () => {
        if(!auth.currentUser)
        {
            setModal(!modal);
        }
    };
    const {photo, isDisableHover} = props;
    const {photoUrl} = photo;
    // const onEditClick = ()=>{
    //     if (handleEditPhoto) handleEditPhoto(photo);
    // }
    // const onRemoveClick = ()=>{
    //     if (handleRemovePhoto) handleRemovePhoto(photo);
    // }

    return (
         
        <div className="row">
            <div className="col-md-12 px-0">
                <MyModal toggle={toggle} modal={modal}/>
                <div className="photo-card rounded-lg overflow-hidden">
                {!isDisableHover?<div className="modal-group">
                            <button onClick={toggle} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={Images.like} /></button>
                            <button onClick={toggle} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
                        </div>: 
                        <div className="modal-group">
                        <button className="control__btn"><img alt="edit" className="control__btn--img small-icon" src={Images.edit} /></button>
                        <button className="control__btn"><img alt="delete" className="control__btn--img small-icon" src={Images.deleteIcon} /></button>
                    </div>
                        }
                    <img src={photoUrl} className="img-fluid " alt='alt'></img>
                    {!isDisableHover?<div className="modal-group author">
                            <a href="/">
                                <img alt="avatar" />
                                <p>author's name</p>
                            </a>
                        </div>: null}
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