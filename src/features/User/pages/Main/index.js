
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ConfirmModal from 'components/CustomModal/ConfirmModal/ConfirmModal';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import CollectionLayout from 'components/CollectionLayout/CollectionLayout';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';
import { getPhotosByAuthorProcess, getPhotosByAuthorSuccess, getPhotosByAuthorFail, removePhoto } from 'features/Photo/photoSlice';
import { getUserCollectionFail, getUserCollectionProcess, getUserCollectionSuccess } from 'features/Collection/CollectionSlice';
import categoryApi from 'api/categoryApi';
import photoApi from 'api/photoApi';
import "./Main.scss";

function Main({ match }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const photos = useSelector(state => state.photos);
  const author = useSelector(state => state.author);
  const collection = useSelector(state => state.collection);

  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {if (activeTab !== tab) setActiveTab(tab);}

  const userId = match.params.userId;
  const currentUserUid = user.currentUser !== null ? user.currentUser.uid : null;
  
  useEffect(() => {
    const getUserCollection = async () => {
      dispatch(getUserCollectionProcess());
      const userCollection = await categoryApi.getUserCollection(userId);
      if (userCollection) {
        dispatch(getUserCollectionSuccess(userCollection));
      }
      else {
        dispatch(getUserCollectionFail());
      }
    }
    getUserCollection();

    const getPhotosByAuthor = async () => {
      dispatch(getPhotosByAuthorProcess());
      const data = await photoApi.getByAuthor(userId);
      if (data) {
        dispatch(getPhotosByAuthorSuccess(data));
      }
      else {
        dispatch(getPhotosByAuthorFail());
      }
    }
    getPhotosByAuthor();

  }, [dispatch, userId])


  const handleDeleteConfirm = useCallback((id, title) => {
    dispatch(confirmActions.openModal({ id: id, title: title }));
  }, [dispatch]);

  const handleDeleteModal = useCallback(async (id) => {
    dispatch(removePhoto(id));
    await photoApi.deletePhoto(id);
  }, [dispatch]);

  if (photos.isLoading || author.isLoading || collection.isLoadUserCollection)
    return (<LoadingComponent />)
  else {

    //get list of photos belong to login user
    const userPhotos = photos.photobyAuthor.map((photo) => {
      return (<PhotoCard currentUserUid={currentUserUid} key={photo._id} isDisableHover={photo.author === currentUserUid ? true : false} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />)
    });
    const likePhotos = photos.photoList.filter(photo => photo.likeCount.findIndex(i => i === userId) !== -1).map((photo) => {
      let photoAuthor = author.authorList.find(item => item.uid === photo.author);
      return (<PhotoCard authorName={photoAuthor ? photoAuthor.displayName : null} currentUserUid={currentUserUid} key={photo._id} isDisableHover={photo.author === currentUserUid ? true : false} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />)
    });

    const collectionPhotos = collection.userCollection.map(collect => {
      let collectPhoto = photos.photobyAuthor.filter(photo => photo.categoryId === collect.categoryId);
      return collectPhoto;
    });

    return (
      <div className="photo-main">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}>
              {`Photos (${userPhotos.length})`}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}>
              {`Likes (${likePhotos.length})`}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              {`Collections (${collection.userCollection.length})`}
            </NavLink>
          </NavItem>
        </Nav>


        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Container fluid="true" className="text-center">
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
          <TabPane tabId="3">
            <CollectionLayout collectionPhotos={collectionPhotos} collection={collection} />
          </TabPane>
        </TabContent>
        <ConfirmModal content="You want to delete this photo:" okAction={handleDeleteModal} />
      </div>
    )
  }
}

export default Main;