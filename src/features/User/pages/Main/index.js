
import AddModal from 'features/Photo/components/AddModal/AddModal';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from 'reactstrap';

import "./Main.scss";
Main.protoTypes = {};

function Main({match}){
    const test = match.path;
    const userId = test.slice(1,);
    const photos = useSelector(state=>state.photos.photoList);
    const breakpointColumnsObj=  {
        default: 3,
        1200: 3,
        992: 3,
        768: 2,
        576: 1,
      };
    const userPhotos = photos.filter((item) => item.author === userId).map((photo) =>
    (<PhotoCard key={photo._id} isDisableHover={true} photo={photo} />));

    userPhotos.unshift(<AddModal key='add-new-photo'/>);

    return (
        <div className="photo-main">
            <Container className="text-center">
                <div className="row">
                    <div className="col-md-12 col-lg-9">
                        
                        <PhotoList photoList={userPhotos} breakpointColumns={breakpointColumnsObj} userId={userId}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Main;