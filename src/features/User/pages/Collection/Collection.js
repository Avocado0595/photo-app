
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import PhotoModal from 'features/Photo/components/PhotoModal';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';

function Collection(props) {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const showPhotoModal = useSelector(state=>state.photoModal.isOpen);

    const collection = useSelector(state=>state.collection);
    const photos = useSelector(state=>state.photos);
    const user = useSelector(state=>state.user);
    const author = useSelector(state=>state.author);

    const currentUserUid = user.currentUser!==null?user.currentUser.uid:null;
    const userId = match.path.split('/')[1];
    const collectionId = match.params.collectionId;


    const handleDeleteConfirm = useCallback((id, title) => {
        dispatch(confirmActions.openModal({id:id, title:title}));
    }, [dispatch]);

    const collectionObj = collection.userCollection.find(c=>c.collectionId === collectionId);
    const photoList = photos.photobyAuthor.filter(photo=>photo.collectionId === collectionObj.collectionId).map((photo) => {
        let photoAuthor = author.authorList.find(item => item.uid === photo.author);
        return (<PhotoCard author={photoAuthor} currentUserUid={currentUserUid} key={photo._id} isDisableHover={photo.author === currentUserUid?true:false} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />)
  });
  if(!collection.isLoading){
    
    return (
        <div>
            <h3>{collectionObj.collectionName}</h3>
            <PhotoList photoList={photoList} userId={userId}/>
            {showPhotoModal?<PhotoModal/>:null}
        </div>
    );
  }
  else{
      return null;
  }
}

export default Collection;