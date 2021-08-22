import Images from 'constants/images';
import React, { useCallback } from 'react';
import './PhotoCard.scss';
import { useDispatch } from 'react-redux';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';

function PhotoCard(props) {
    const dispatch = useDispatch();
    const openModal = useCallback(()=>dispatch(signInActions.openModal()),[dispatch]);
    const {photo, isDisableHover, authorName, handleDeleteConfirm} = props;
    const {photoUrl, _id, title } = photo;
    const handleEditPhoto = (id)=>{
        dispatch(addEditActions.openEditModal(id));
    }
    
    const handleDeletePhoto = (id, title)=>{
        if(handleDeleteConfirm)
            handleDeleteConfirm(id, title);
    }

    return (     
        <div className="row">     
            <div className="col-md-12 px-0">
                <div className="photo-card rounded-lg overflow-hidden">
                <div className="cover-modal"></div>
                {!isDisableHover?
                        <div className="modal-group">
                            <button onClick={openModal} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={Images.like} /></button>
                            <button onClick={openModal} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
                        </div>: 
                        <div className="modal-group">
                            <button onClick={()=>handleEditPhoto(_id)} className="control__btn"><img alt="edit" className="control__btn--img small-icon" src={Images.edit} /></button>
                            <button onClick={()=>handleDeletePhoto(_id, title)} className="control__btn"><img alt="delete" className="control__btn--img small-icon" src={Images.deleteIcon} /></button>
                        </div>
                        }
                    <img src={photoUrl} className="img-fluid " alt='alt'></img>
                    {!isDisableHover?<div className="modal-group author">
                            <a href="/">
                                {/* <img alt="avatar" /> */}
                                {authorName}
                            </a>
                        </div>: null}
                </div>
            </div>
        </div>        
    );
}


export default PhotoCard;