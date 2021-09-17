import categoryApi from 'api/categoryApi';
import photoApi from 'api/photoApi';
import UserInfo from 'components/UserInfo/UserInfo';
import Images from 'constants/images';
import { getUserCollectionFail, getUserCollectionProcess, getUserCollectionSuccess } from 'features/Collection/CollectionSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import { photoModalActions } from 'utils/ModalSlice/PhotoModalSlice';
import { signInActions } from 'utils/ModalSlice/SignInModalSlice';
import { likePhoto, unlikePhoto } from '../photoSlice';

import './PhotoCard.scss';
import './PhotoModal.scss';


function PhotoModal(props) {
    const dispatch = useDispatch();
    const collection = useSelector(state=>state.collection.userCollection);
    
    const authorList = useSelector(state=>state.author.authorList);
    const modal = useSelector(state=>state.photoModal);
    const photoSlice = useSelector(state=>state.photos);
    const currentUserUid = useSelector(state=>state.user.currentUser?.uid);

    const photo = photoSlice.photoList.find(p=>p._id === modal.photo._id);
    const { photoUrl, _id, title, likeCount, author, categoryId } = photo;    
    const photoAuthor = authorList.find(a=>a.uid === author);
    const collectionName = collection.find(c=>c.categoryId === categoryId);
    const isLiked = currentUserUid !== null ? likeCount.find(item => item === currentUserUid) : null;
    
    const openSinginModal = useCallback(() => dispatch(signInActions.openModal()), [dispatch]);
    const toggle = useCallback(()=>dispatch(photoModalActions.closeModal()),[dispatch]);

    useEffect(()=>{
        const getUserCollection = async () => {
            dispatch(getUserCollectionProcess());
            const userCollection = await categoryApi.getUserCollection(author);
            if (userCollection) {
              dispatch(getUserCollectionSuccess(userCollection));
            }
            else {
              dispatch(getUserCollectionFail());
            }
          }
          getUserCollection();
    },[author,dispatch]);

    const handleLike = async () => {
        if (currentUserUid) {
            if (!isLiked) {
                dispatch(likePhoto({ id: _id, userId: currentUserUid }));
                await photoApi.likePhoto(_id, {userUid:currentUserUid});
            }
            else {
                dispatch(unlikePhoto({ id: _id, userId: currentUserUid }));
                await photoApi.unLikePhoto(_id, {userUid:currentUserUid});
            }
           
        }
        else {
            openSinginModal();
        }

    };

    const hanldeAddFromOtherUser = () => {
        dispatch(addEditActions.openAddModal(_id));
        if (!currentUserUid)
            openSinginModal();
    }
    
    
    return (
        <div>
            <Modal className="photo-modal-layout" isOpen={modal.isOpen} toggle={toggle}>
            <ModalHeader className="photo-modal-header" toggle={toggle}>
                <UserInfo userName={photoAuthor.displayName} avatar={photoAuthor.photoURL} userLink={photoAuthor.uid}/>
                        <div className="control-group">
                            <button onClick={() => handleLike()} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={isLiked ? Images.liked : Images.unlike} /></button>
                            <button onClick={() => hanldeAddFromOtherUser()} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
                        </div> 
                </ModalHeader>
                <ModalBody className="modal-img-layout">
                   <img className="modal-img" src={photoUrl}/>

                </ModalBody>
                <ModalFooter className="photo-modal-footer">
                    <table className="footer__table">
                        <thead>
                            <tr>
                                <th className="footer__table--header">Title</th>
                                <th className="footer__table--header">Collection</th>
                                <th className="footer__table--header">Likes</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td className="footer__table--row">{title}</td>
                                <td className="footer__table--row">
                                    <Link to={`${author}/${categoryId}`}>
                                        {collectionName?.categoryName}
                                    </Link>
                                </td>
                                <td className="footer__table--row">{likeCount.length}</td>
                            </tr>

                        </tbody>
                    </table>
                </ModalFooter>
            </Modal>
            
        </div>
    )
}

export default PhotoModal;