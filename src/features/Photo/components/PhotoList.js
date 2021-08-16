
import { getPhotos } from 'features/Photo/photoSlice';
import PhotoCard from './PhotoCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Masonry from 'react-masonry-css';
import "./PhotoList.scss";
import photoApi from 'api/photoApi';
import AddModal from './AddModal/AddModal';
PhotoList.protoTypes = {};

function PhotoList(props){
    const {isDisableHover, breakpointColumns, userId} = props;
    const photos = useSelector(state => state.photos.photoList);
    const dispatch =useDispatch();

    useEffect(()=>{
        const fetchProductList =  async() =>{
            try{
            const data = await photoApi.getAll();
              dispatch(getPhotos(data));
            }
            catch(error){
              console.log('Fetch data failed: ', error);
            }
          };
          fetchProductList();
    },[dispatch])
    
    // const handleEditPhoto = (photo) =>{
    //     const editUrl = `/photos/${photo.id}`;
    //     history.push(editUrl);
    // }
    // const handleRemovePhoto = (photo)=>{
    //     const action = removePhoto(photo.id);
    //     dispatch(action);
    // }
//TODO: pass author for banner
  
  const userElements = userId && photos ? photos.filter((item) => item.author === userId).map((photo) =>
    (<PhotoCard isDisableHover={isDisableHover} photo={photo} />)) : null;
  userElements && userElements.unshift(<AddModal/>);

  const childElements = photos ? photos.map((photo) =>
    (<PhotoCard isDisableHover={isDisableHover} photo={photo} />)) : null;

  const breakpointColumnsObj =  {default: 4, 1200: 3, 992: 3, 768: 2, 576: 1};
    return (
      <div className="photo-main">
        <Container className="text-center">
          <div className="row">
            <div className="col-md-12">
              <Masonry
                breakpointCols={breakpointColumns ?? breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column">
                {!userId ? childElements : userElements}
              </Masonry>
            </div>
          </div>
        </Container>
      </div>
    )
}

export default PhotoList;