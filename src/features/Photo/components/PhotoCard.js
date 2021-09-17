import Images from 'constants/images';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInActions } from 'utils/ModalSlice/SignInModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { likePhoto, unlikePhoto } from '../photoSlice';
import photoApi from 'api/photoApi';
import './PhotoCard.scss';
import { photoModalActions } from 'utils/ModalSlice/PhotoModalSlice';
import UserInfo from 'components/UserInfo/UserInfo';
import {useSelector} from 'react';
import PhotoModal from 'features/Photo/components/PhotoModal';
import LazyLoad from 'react-lazyload';

function PhotoCard(props) {
    const dispatch = useDispatch();
 
    const { photo, isDisableHover, author, handleDeleteConfirm, currentUserUid } = props;
    const { photoUrl, _id, title, likeCount } = photo;
    const isLiked = currentUserUid !== null ? (likeCount.findIndex(item => item === currentUserUid) === -1 ? false : true) : null;

    const openSinginModal = useCallback(() => dispatch(signInActions.openModal()), [dispatch]);

    const handleLike = async (id, userId) => {
        if (userId) {
            if (!isLiked) {
                dispatch(likePhoto({ id: id, userId: userId }));
                await photoApi.likePhoto(_id, { userUid: userId });
            }
            else {
                dispatch(unlikePhoto({ id: id, userId: userId }));
                await photoApi.unLikePhoto(_id, { userUid: userId });
            }
        }
        else {
            openSinginModal();
        }
    };

    const handleEditPhoto = (id) => dispatch(addEditActions.openEditModal(id));

    const handleDeletePhoto = (id, title) => {
        if (handleDeleteConfirm)
            handleDeleteConfirm(id, title);
    }
    const hanldeAddFromOtherUser = (photoId) => {
        dispatch(addEditActions.openAddModal(photoId));
        if (!currentUserUid)
            openSinginModal();
    }
    const handleOpenPhotoModel = useCallback(()=>{
        if(author){
            console.log(author);
            dispatch(photoModalActions.openModal({photo:photo}));
        }
    },[author]);
    return (
        <div className="row">
            <div className="col-md-12 px-0">
                <div className="photo-card rounded-lg overflow-hidden">
                    <div onClick={handleOpenPhotoModel} className="cover-modal"></div>
                    <div className="modal-group">
                        <div className="title">{title}</div>
                        {!isDisableHover ?
                            <div className="control-group">
                                <button onClick={() => handleLike(_id, currentUserUid)} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={isLiked ? Images.liked : Images.unlike} /></button>
                                <button onClick={() => hanldeAddFromOtherUser(_id)} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
                            </div> :
                            <div className="control-group">
                                <button onClick={() => handleEditPhoto(_id)} className="control__btn"><img alt="edit" className="control__btn--img small-icon" src={Images.edit} /></button>
                                <button onClick={() => handleDeletePhoto(_id, title)} className="control__btn"><img alt="delete" className="control__btn--img small-icon" src={Images.deleteIcon} /></button>
                            </div>
                        }
                    </div>
                    
                    <LazyLoad height={200} offset={[-100,100]}><img src={photoUrl} className="img-fluid " alt='alt'/></LazyLoad>
                   
                    {!isDisableHover && author ? <div className="modal-group author">
                        <UserInfo userName={author.displayName} avatar={author.photoURL} userLink={`/${photo.author}`}/>
                    </div> : null}
                </div>
            </div>
      
        </div>
    );
}


export default PhotoCard;