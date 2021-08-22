import React from 'react';
import Banner from 'components/Banner';
import Images from 'constants/images';

import './AddEdit.scss';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, editPhoto } from 'features/Photo/photoSlice';
import { useHistory, useParams } from 'react-router-dom';
AddEdit.propTypes = {
    
};

function AddEdit() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {photoId} = useParams();
    const isAddPhoto = !photoId;
    const editedPhoto = useSelector(state=>state.photos.find(photo => photo.id+'' === photoId));
    const initialValues = isAddPhoto?
    {
        title:'',
        categoryId:null,
        imgUrl:''
    }:
    editedPhoto;

    const handleSubmit = (values) =>{
        return new Promise(resolve=> {
            setTimeout(() => {
                if(isAddPhoto){
                    const addAction = addPhoto(values);
                    dispatch(addAction);
                    history.push("/photos");
                    resolve(true);
                }
                else{
                    const editAction = editPhoto(values);
                    dispatch(editAction);
                    history.push("/photos");
                    resolve(true);
                }
                
            }
            , 2000)
        })
        
    }


    return (
        <div className="photo-edit">
            <Banner title="Collect your favourite photos!" backgroundUrl={Images.stone_banner}/>
            <div className="photo-edit__form">
                <PhotoForm initialValues={initialValues} onSubmit={handleSubmit}/>
            </div>
        </div>
    );
}

export default AddEdit;