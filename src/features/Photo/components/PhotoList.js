
import React from 'react';
import {  useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Masonry from 'react-masonry-css';
import "./PhotoList.scss";
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
PhotoList.protoTypes = {};

function PhotoList(props){
    const { breakpointColumns, photoList} = props;
    const isLoadingPhotoList = useSelector(state=>state.photos.isLoading);
//TODO: pass author for banner
  const breakpointColumnsObj =  {default: 4, 1200: 3, 992: 3, 768: 2, 576: 1};

  if(isLoadingPhotoList)
  return(<LoadingComponent/>)
  else
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
        </div>
      
     
    )
}

export default PhotoList;