
import { getPhotos, removePhoto } from 'features/Photo/photoSlice';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import Masonry from 'react-masonry-css';
import "./PhotoList.scss";
import photoApi from 'api/photoApi';
import ConfirmModal from 'components/CustomModal/ConfirmModal/ConfirmModal';
PhotoList.protoTypes = {};

function PhotoList(props){
    const { breakpointColumns, photoList} = props;
    const dispatch =useDispatch();
    
    useEffect(()=>{
        const fetchProductList =  async() =>{
            try{
              const data = await photoApi.getAll();
              dispatch(getPhotos(data));
            }
            catch(error){
              console.log('Fetch photo failed: ', error);
            }
          };
          fetchProductList();
    },[dispatch])
    const handleDelete = useCallback((id)=>{
      dispatch(removePhoto(id));
    }, [dispatch])
//TODO: pass author for banner
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
                {photoList}
              </Masonry>
            </div>
          </div>
        </Container>
        <ConfirmModal content="You want to delete this photo" okAction={handleDelete} />
      </div>
    )
}

export default PhotoList;