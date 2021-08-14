
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import { removePhoto } from 'features/Photo/photoSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';
import Masonry from 'react-masonry-css';
 
import "./Main.scss";
import PhotoCard from 'features/Photo/components/PhotoCard';
import photoApi from 'api/photoApi';
Main.protoTypes = {};

function Main(){
    const photos = useSelector(state => state.photos);
    const dispatch =useDispatch();
    const history = useHistory();

    useEffect(()=>{
        const fetchProductList =  async() =>{
            try{
              //const params = {_page:1, _limit:10};
            const data = await photoApi.getAll();
            console.log(data);
            }
            catch(error){
              console.log('Fetch data failed: ', error);
            }
          };
          fetchProductList();
    },[])
    const handleEditPhoto = (photo) =>{
        const editUrl = `/photos/${photo.id}`;
        history.push(editUrl);
    }
    const handleRemovePhoto = (photo)=>{
        const action = removePhoto(photo.id);
        dispatch(action);
    }
//TODO: pass author for banner

const childElements =photos.map((photo) => (
    <PhotoCard photo={photo} />
  ));
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    992: 3,
    768: 2,
    576: 1,
  };
    return (
        <div className="photo-main">
            <Banner author="unknow" backgroundUrl={Images.pocket_banner}/>
            <Container className="text-center">
            <div className="row">
          <div className="col-md-12">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {childElements}
                {/* <PhotoList photoList={photos} handleEditPhoto = {handleEditPhoto} handleRemovePhoto ={handleRemovePhoto}/> */}
            </Masonry>
                </div>
                </div>
            </Container>
        </div>
    )
}

export default Main;