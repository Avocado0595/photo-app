import Images from 'constants/images';
import React, { useCallback, useEffect } from 'react';
import './PhotoCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { likePhoto, unlikePhoto } from '../photoSlice';
import photoApi from 'api/photoApi';

function PhotoCard(props) {
    const dispatch = useDispatch();
    const openModal = useCallback(()=>dispatch(signInActions.openModal()),[dispatch]);
    const user = useSelector(state=>state.user);
    const userId = user.currentUser!==null?user.currentUser.uid:null;
    const {photo, isDisableHover, authorName, handleDeleteConfirm} = props;
    const {photoUrl, _id, title, likeCount } = photo;
    const isLiked = user.currentUser!==null?likeCount.findIndex(item=>item === user.currentUser.uid)===-1?false:true:null;
    useEffect(()=>{
        photoApi.updatePhoto(_id,photo);
    },[photo, _id]);
    const handleLike = (id, userId) => {
        openModal();
        if (userId) {
            if(!isLiked)
                dispatch(likePhoto({ id: id, userId: userId }));
            else
                dispatch(unlikePhoto({id: id, userId: userId}));
        }
    }
    
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
                            <button onClick={()=>handleLike(_id, userId)} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={isLiked?Images.liked:Images.unlike} /></button>
                            <button onClick={()=>openModal()} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
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