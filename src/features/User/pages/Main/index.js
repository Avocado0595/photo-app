
import ConfirmModal from 'components/CustomModal/ConfirmModal/ConfirmModal';
import AddModal from 'features/User/component/AddEditModal/AddEditModal';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import { getPhotosByAuthorProcess, getPhotosByAuthorSuccess,getPhotosByAuthorFail, removePhoto } from 'features/Photo/photoSlice';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'reactstrap';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';

import "./Main.scss";
import photoApi from 'api/photoApi';
import Images from 'constants/images';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';

Main.protoTypes = {};

function Main({match}){
    const test = match.path;
    const userId = test.slice(1,);
    const photos = useSelector(state=>state.photos.photobyAuthor);
    const isLoading = useSelector(state=>state.photos.isLoadingPhotoByAuthor);

   


    const breakpointColumnsObj=  {default: 3, 1200: 3,992: 3,768: 2,576: 2,};
    const dispatch = useDispatch();
    useEffect(()=>{
        const getPhotosByAuthor =async() => {
            dispatch(getPhotosByAuthorProcess());
            const data=await photoApi.getByAuthor(userId);
            if(data){
                dispatch(getPhotosByAuthorSuccess(data));
            }
            else{
                dispatch(getPhotosByAuthorFail());
            }
        }
        getPhotosByAuthor();

    }, [dispatch, userId])


    const handleDeleteConfirm = useCallback((id, title) => {
        dispatch(confirmActions.openModal({id:id, title:title}));
    }, [dispatch]);

    const handleDeleteModal = useCallback(async (id) => {
        dispatch(removePhoto(id));
        await photoApi.deletePhoto(id);

    }, [dispatch]);

    const handleAddPhoto = useCallback(()=>{
        dispatch(addEditActions.openAddModal());
    }, [dispatch])


    if (isLoading)
        return (<LoadingComponent />)
    else {
        //get list of photos belong to login user
        const userPhotos = photos.map((photo) => (<PhotoCard key={photo._id} isDisableHover={true} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />));
        userPhotos.unshift(<button onClick={handleAddPhoto} key="add-photo-btn-key-01" className="add-photo"><p>Add new photo</p><img alt="add" className="add-photo__img" src={Images.add} /></button>);

        return (
            <div className="photo-main">
                
                <Container className="text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <PhotoList photoList={userPhotos} breakpointColumns={breakpointColumnsObj} userId={userId} />
                        </div>
                    </div>
                </Container>
                <ConfirmModal content="You want to delete this photo:" okAction={handleDeleteModal} />
                <AddModal />
            </div>
        )
    }
}

export default Main;