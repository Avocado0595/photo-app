import Images from 'constants/images';
import React, { useCallback, useEffect } from 'react';
import './PhotoCard.scss';
import { useDispatch, useSelector } from 'react-redux';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { likePhoto, unlikePhoto } from '../photoSlice';
import photoApi from 'api/photoApi';
import { Link } from 'react-router-dom';
import AddEditModal from 'features/User/component/AddEditModal/AddEditModal';

function PhotoCard(props) {
    const dispatch = useDispatch();
    const openSinginModal = useCallback(()=>dispatch(signInActions.openModal()),[dispatch]);
    //const openAddModal = useCallback(()=>dispatch(addEditActions.openAddModal),[dispatch]);
    //const closeModal = useCallback(()=>dispatch(addEditActions.closeModal),[dispatch]);
    const addEditToggle = useSelector(state=>state.AddEditToggle);
    const {photo, isDisableHover, authorName, handleDeleteConfirm, currentUserUid} = props;
    const {photoUrl, _id, title, likeCount } = photo;
    const isLiked = currentUserUid!==null?(likeCount.findIndex(item=>item === currentUserUid)===-1?false:true):null;
    useEffect(()=>{
        photoApi.updatePhoto(_id,photo);
    },[photo, _id]);
    const handleLike = (id, userId) => {
        
        if (userId) {
            
            if(!isLiked)
                dispatch(likePhoto({ id: id, userId: userId }));
            else
                dispatch(unlikePhoto({id: id, userId: userId}));
        }
        else{
    
            openSinginModal();
        }

    };
    
    const handleEditPhoto = (id)=>{
        dispatch(addEditActions.openEditModal(id));
        //openAddModal();
    }
    
    const handleDeletePhoto = (id, title)=>{
        if(handleDeleteConfirm)
            handleDeleteConfirm(id, title);
    }
    const hanldeAddFromOtherUser = (photoId)=>{
        dispatch(addEditActions.openAddModal(photoId));
        if(!currentUserUid)
            openSinginModal();
        // console.log(addEditToggle.isOpen)
        // if(addEditToggle.isOpen)
        //     openAddModal();
        //     else
        //     closeModal();
    }

    return (     
        <div className="row">     
            <div className="col-md-12 px-0">
                <div className="photo-card rounded-lg overflow-hidden">
                <div className="cover-modal"></div>
                {!isDisableHover?
                        <div className="modal-group">
                            <button onClick={()=>handleLike(_id, currentUserUid)} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={isLiked?Images.liked:Images.unlike} /></button>
                            <button onClick={()=>hanldeAddFromOtherUser(_id)} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
                        </div>: 
                        <div className="modal-group">
                            <button onClick={()=>handleEditPhoto(_id)} className="control__btn"><img alt="edit" className="control__btn--img small-icon" src={Images.edit} /></button>
                            <button onClick={()=>handleDeletePhoto(_id, title)} className="control__btn"><img alt="delete" className="control__btn--img small-icon" src={Images.deleteIcon} /></button>
                        </div>
                        }
                    <img src={photoUrl} className="img-fluid " alt='alt'></img>
                    {!isDisableHover?<div className="modal-group author">
                            <Link to={`/${photo.author}`}>
                                {/* <img alt="avatar" /> */}
                                {authorName}
                            </Link>
                        </div>: null}
                </div>
            </div>
        </div>        
    );
}


export default PhotoCard;