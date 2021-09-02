
import ConfirmModal from 'components/CustomModal/ConfirmModal/ConfirmModal';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import { getPhotosByAuthorProcess, getPhotosByAuthorSuccess,getPhotosByAuthorFail, removePhoto } from 'features/Photo/photoSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';

import "./Main.scss";
import photoApi from 'api/photoApi';
import Images from 'constants/images';
import { addEditActions } from 'utils/ModalSlice/AddEditModalSlice';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';

Main.protoTypes = {};

function Main({match}){

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }


    const user = useSelector(state=>state.user);
    const currentUserUid = user.currentUser!==null?user.currentUser.uid:null;
    const userId = match.params.userId;
   
    const photosA = useSelector(state=>state.photos.photobyAuthor);
    const photos = useSelector(state=>state.photos.photoList);
    const isLoading = useSelector(state=>state.photos.isLoadingPhotoByAuthor);
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




    if (isLoading)
        return (<LoadingComponent />)
    else {
        //get list of photos belong to login user
        
        const userPhotos = photosA.map((photo) => (<PhotoCard currentUserUid={currentUserUid} key={photo._id} isDisableHover={photo.author === currentUserUid?true:false} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />));
        const likePhotos = photos.map((photo) => {
                    if(photo.likeCount.findIndex(i=>i === userId) !== -1)
                return (<PhotoCard currentUserUid={currentUserUid} key={photo._id} isDisableHover={photo.author === currentUserUid?true:false} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />)
        });

        // userPhotos.unshift(<button onClick={handleAddPhoto} key="add-photo-btn-key-01" className="add-photo"><p>Add new photo</p><img alt="add" className="add-photo__img" src={Images.add} /></button>);

        return (
            <div className="photo-main">
                <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Photos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Likes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Collections
          </NavLink>
        </NavItem>
      </Nav>


      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
                    <Container className="text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <PhotoList photoList={userPhotos} userId={userId} />
                            </div>
                        </div>
                    </Container>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
            <Container className="text-center">
                        <div className="row">
                            <div className="col-md-12">
                                <PhotoList photoList={likePhotos} userId={userId} />
                            </div>
                        </div>
                    </Container>
            </Col>
            
          </Row>
        </TabPane>
      </TabContent>



      <ConfirmModal content="You want to delete this photo:" okAction={handleDeleteModal} />
                
                
            </div>
        )
    }
}

export default Main;