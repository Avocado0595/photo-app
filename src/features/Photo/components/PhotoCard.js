import Images from 'constants/images';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signInActions } from 'utils/ModalSlice/SignInModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { likePhoto, unlikePhoto } from '../photoSlice';
import photoApi from 'api/photoApi';
import './PhotoCard.scss';
import { photoModalActions } from 'utils/ModalSlice/PhotoModalSlice';
import UserInfo from 'components/UserInfo/UserInfo';
import LazyLoad from 'react-lazy-load';

function PhotoCard(props) {
    const dispatch = useDispatch();
    const openSinginModal = useCallback(() => dispatch(signInActions.openModal()), [dispatch]);
 
    const { photo, isDisableHover, author, handleDeleteConfirm, currentUserUid } = props;
    const { photoUrl, _id, title, like } = photo;
    const isLiked = currentUserUid !== null ? (like.findIndex(item => item === currentUserUid) === -1 ? false : true) : null;

    const handleLike = async () => {
        if (currentUserUid) {
            if (!isLiked) {
                dispatch(likePhoto({ id: _id, userId: currentUserUid }));
                await photoApi.likePhoto(_id, { userUid: currentUserUid });
            }
            else {
                dispatch(unlikePhoto({ id: _id, userId: currentUserUid }));
                await photoApi.unLikePhoto(_id, { userUid: currentUserUid });
            }
        }
        else {
            openSinginModal();
        }
    };

    const handleEditPhoto = () => dispatch(addEditActions.openEditModal(_id));

    const handleDeletePhoto = () => {
        if (handleDeleteConfirm)
            handleDeleteConfirm(_id, title);
    }
    const hanldeAddFromOtherUser = () => {
        dispatch(addEditActions.openAddModal(_id));
        if (!currentUserUid)
            openSinginModal();
    }
    const handleOpenPhotoModel = useCallback(()=>{

        if(author){
            
            dispatch(photoModalActions.openModal({photo:photo}));
        }
    },[author, dispatch, photo]);
    return (
        <div className="row">
            <div className="col-md-12 px-0">
                <div className="photo-card rounded-lg overflow-hidden">
                    <div onClick={handleOpenPhotoModel} className="cover-modal"></div>
                    <div className="modal-group">
                        <div className="title">{title}</div>
                        {!isDisableHover ?
                            <div className="control-group">
                                <button onClick={handleLike} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={isLiked ? Images.liked : Images.unlike} /></button>
                                <button onClick={hanldeAddFromOtherUser} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
                            </div> :
                            <div className="control-group">
                                <button onClick={handleEditPhoto} className="control__btn"><img alt="edit" className="control__btn--img small-icon" src={Images.edit} /></button>
                                <button onClick={handleDeletePhoto} className="control__btn"><img alt="delete" className="control__btn--img small-icon" src={Images.deleteIcon} /></button>
                            </div>
                        }
                    </div>
                    <LazyLoad><img onClick={()=>console.log('img click')} src={photoUrl} className="img-fluid " alt='alt'/></LazyLoad>
                    {!isDisableHover && author ? <div className="modal-group author">
                        <UserInfo userName={author.displayName} avatar={author.photoURL} userLink={`/${photo.author}`}/>
                    </div> : null}
                </div>
            </div>
      
        </div>
    );
}


export default PhotoCard;