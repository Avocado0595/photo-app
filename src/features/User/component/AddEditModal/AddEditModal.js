import React, {useEffect, useCallback} from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import PhotoForm from '../../../Photo/components/PhotoForm';
import './AddModal.scss';
import {auth} from '../../../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from 'api/categoryApi';
import { getCategoryProcess, getCategorySuccess, getCategoryFail } from 'features/Category/CategorySlice';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
import { editPhoto } from 'features/Photo/photoSlice';
function AddEditModal() {
    const dispatch = useDispatch();
    
    const {isOpen, header, photoId} = useSelector(state=>state.AddEditToggle);
    const isEdit = useSelector(state=>state.AddEditToggle.isEdit);
    const isCategoryLoading = useSelector(state=>state.category.isLoading);
    const currentUserUid =auth.currentUser.uid;
    const photoListByAuthor = useSelector(state=>state.photos.photobyAuthor);
    const editedPhoto = photoListByAuthor.find(item=>item._id === photoId);

    const handleCloseAddModal = useCallback(()=>{
        dispatch(addEditActions.closeModal());
    }, [dispatch])

    const initialValues = editedPhoto? {
        title: editedPhoto.title,
    categoryId: editedPhoto.categoryId,
    photoUrl: editedPhoto.photoUrl,
    author: auth.currentUser.uid
    }:{
        title: '',
    categoryId:'',
    photoUrl: '',
    author: auth.currentUser.uid
    }

    //get list of category to fill select field
    useEffect(()=>{
        const fetchCategoryList=  async() =>{
            try{
                dispatch(getCategoryProcess());
            const data = await categoryApi.getAll();
            const categoryOptions = await data?data.filter((item)=>item.author === currentUserUid).map(item=>{
                return{
                    value: item.categoryId,
                    label: item.categoryName
                }}):null;
           
            dispatch(getCategorySuccess(categoryOptions));
            }
            catch(error){
              dispatch(getCategoryFail());
            }
          };
          fetchCategoryList();
    },[dispatch, currentUserUid])

    //
    if(isCategoryLoading)
        return (<LoadingComponent/>)
        else
    return (
        <>       
        <Modal isOpen={isOpen} toggle={handleCloseAddModal}>
        <ModalHeader toggle={handleCloseAddModal}>{header}</ModalHeader>
        <PhotoForm isEdit={isEdit} editedPhoto={editedPhoto} initialValues={initialValues} toggle={handleCloseAddModal}/>
    </Modal>
    </>
    );
}

export default AddEditModal;