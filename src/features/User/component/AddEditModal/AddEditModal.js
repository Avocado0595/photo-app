import React, {useEffect, useCallback} from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import PhotoForm from '../../../Photo/components/PhotoForm';
import {auth} from '../../../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import collectionApi from 'api/collectionApi';
import { getCollectionProcess, getCollectionSuccess, getCollectionFail } from 'features/Collection/CollectionSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';

function AddEditModal() {
    const dispatch = useDispatch();
    const currentUserUid =auth.currentUser.uid;
    const {isOpen, header, photoId, isEdit} = useSelector(state=>state.AddEditToggle);
    const isCollectionLoading = useSelector(state=>state.collection.isLoading);
    const photos = useSelector(state=>state.photos);
    const editedPhoto = photos.photobyAuthor.find(item=>item._id === photoId);
    const addPhotoFromUser = photos.photoList.find(item=>item._id === photoId);
   
    const initialValues = editedPhoto? {
        title: editedPhoto.title,
        collectionId: editedPhoto.collectionId,
        photoUrl: editedPhoto.photoUrl,
        author: auth.currentUser.uid,
        like: editedPhoto.like,
    }:addPhotoFromUser?{
        title: addPhotoFromUser.title,
        collectionId: null,
        photoUrl: addPhotoFromUser.photoUrl,
        author: auth.currentUser.uid,
        like: [],
    }:{
        title: '',
        collectionId:'',
        photoUrl: '',
        author: auth.currentUser.uid,
        like: []
    }
    
    const handleCloseAddModal = useCallback(()=>dispatch(addEditActions.closeModal()),[dispatch]);
    useEffect(()=>{
        const fetchcollectionList=  async() =>{
            try{
                dispatch(getCollectionProcess());
            const data = await collectionApi.getAll();
            const collectionOptions = await data?data.filter((item)=>item.author === currentUserUid).map(item=>{
                return{
                    value: item.collectionId,
                    label: item.collectionName
                }}):null;
           
            dispatch(getCollectionSuccess(collectionOptions));
            }
            catch(error){
              dispatch(getCollectionFail());
            }
          };
          fetchcollectionList();
    },[dispatch, currentUserUid])

    if(isCollectionLoading){
        return null;
    }
    else{
        return (
            <>
                <Modal isOpen={isOpen} toggle={handleCloseAddModal}>
                    <ModalHeader toggle={handleCloseAddModal}>{header}</ModalHeader>
                    <PhotoForm isEdit={isEdit} editedPhoto={editedPhoto} initialValues={initialValues} toggle={handleCloseAddModal} />
                </Modal>
            </>
        );
    }
}

export default AddEditModal;