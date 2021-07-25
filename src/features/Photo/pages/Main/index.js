
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
 
import "./Main.scss";
Main.protoTypes = {};

function Main(){
    const photos = useSelector(state => state.photos);
    const dispatch =useDispatch();
    const history = useHistory();
    const handleEditPhoto = (photo) =>{
        const editUrl = `/photos/${photo.id}`;
        history.push(editUrl);
    }
    const handleRemovePhoto = (photo)=>{
        const action = removePhoto(photo.id);
        dispatch(action);
    }

    return (
        <div className="photo-main">
            <Banner title="Collect your favourite photos!" backgroundUrl={Images.pocket_banner}/>
            <Container className="text-center">
                <PhotoList photoList={photos} handleEditPhoto = {handleEditPhoto} handleRemovePhoto ={handleRemovePhoto}/>
            </Container>
        </div>
    )
}

export default Main;