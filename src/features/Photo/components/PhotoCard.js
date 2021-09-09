import Images from 'constants/images';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInActions } from 'utils/ModalSlice/SignInModalSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { likePhoto, unlikePhoto } from '../photoSlice';
import photoApi from 'api/photoApi';
import './PhotoCard.scss';
import LazyLoad from 'react-lazyload';


function PhotoCard(props) {
    const dispatch = useDispatch();
    const openSinginModal = useCallback(() => dispatch(signInActions.openModal()), [dispatch]);
    const { photo, isDisableHover, authorName, handleDeleteConfirm, currentUserUid } = props;
    const { photoUrl, _id, title, likeCount } = photo;
    const isLiked = currentUserUid !== null ? (likeCount.findIndex(item => item === currentUserUid) === -1 ? false : true) : null;
    useEffect(() => photoApi.updatePhoto(_id, photo), [photo, _id]);
    const handleLike = (id, userId) => {
        if (userId) {
            !isLiked ? dispatch(likePhoto({ id: id, userId: userId })) : dispatch(unlikePhoto({ id: id, userId: userId }));
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

    return (
        <div className="row">
            <div className="col-md-12 px-0">
                <div className="photo-card rounded-lg overflow-hidden">
                    <div className="cover-modal"></div>
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
                    <LazyLoad key={photo._id} height={100} offset={[-100, 100]}>
                    <img src={photoUrl} className="img-fluid " alt='alt'></img>
                    </LazyLoad>
                    {!isDisableHover ? <div className="modal-group author">
                        <Link to={`/${photo.author}`}>
                            {authorName}
                        </Link>
                    </div> : null}
                </div>
            </div>
        </div>
    );
}


export default PhotoCard;