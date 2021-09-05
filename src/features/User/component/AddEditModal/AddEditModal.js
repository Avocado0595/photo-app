import React, {useEffect, useCallback} from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import PhotoForm from '../../../Photo/components/PhotoForm';
import './AddModal.scss';
import {auth} from '../../../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from 'api/categoryApi';
import { getCollectionProcess, getCollectionSuccess, getCollectionFail } from 'features/Collection/CollectionSlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';

function AddEditModal() {
    const dispatch = useDispatch();
    const currentUserUid =auth.currentUser.uid;
    const {isOpen, header, photoId, isEdit} = useSelector(state=>state.AddEditToggle);
    const isCategoryLoading = useSelector(state=>state.collection.isLoading);
    const photos = useSelector(state=>state.photos);
    const editedPhoto = photos.photobyAuthor.find(item=>item._id === photoId);
    const addPhotoFromUser = photos.photoList.find(item=>item._id === photoId);
   
    const initialValues = editedPhoto? {
        title: editedPhoto.title,
        categoryId: editedPhoto.categoryId,
        photoUrl: editedPhoto.photoUrl,
        author: auth.currentUser.uid,
        likeCount: editedPhoto.likeCount,
    }:addPhotoFromUser?{
        title: addPhotoFromUser.title,
        categoryId: null,
        photoUrl: addPhotoFromUser.photoUrl,
        author: auth.currentUser.uid,
        likeCount: [],
    }:{
        title: '',
        categoryId:'',
        photoUrl: '',
        author: auth.currentUser.uid,
        likeCount: []
    }
    
    const handleCloseAddModal = useCallback(()=>{
        dispatch(addEditActions.closeModal());
    }, [dispatch])
    //get list of category to fill select field
    useEffect(()=>{
        const fetchCategoryList=  async() =>{
            try{
                dispatch(getCollectionProcess());
            const data = await categoryApi.getAll();
            const collectionOptions = await data?data.filter((item)=>item.author === currentUserUid).map(item=>{
                return{
                    value: item.categoryId,
                    label: item.categoryName
                }}):null;
           
            dispatch(getCollectionSuccess(collectionOptions));
            }
            catch(error){
              dispatch(getCollectionFail());
            }
          };
          fetchCategoryList();
    },[dispatch, currentUserUid])

    //
    if(isCategoryLoading){
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