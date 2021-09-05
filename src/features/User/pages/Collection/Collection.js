import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';

function Collection(props) {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const collection = useSelector(state=>state.collection);
    const photos = useSelector(state=>state.photos);
    const user = useSelector(state=>state.user);

    const currentUserUid = user.currentUser!==null?user.currentUser.uid:null;
    const userId = match.path.split('/')[1];
    const collectionId = match.params.collectionId;

    const handleDeleteConfirm = useCallback((id, title) => {
        dispatch(confirmActions.openModal({id:id, title:title}));
    }, [dispatch]);

    const collectionObj = collection.userCollection.find(c=>c.categoryId === collectionId);
    const photoList = photos.photobyAuthor.filter(photo=>photo.categoryId === collectionObj.categoryId).map((photo) => {
        return (<PhotoCard currentUserUid={currentUserUid} key={photo._id} isDisableHover={photo.author === currentUserUid?true:false} photo={photo} handleDeleteConfirm={handleDeleteConfirm} />)
  });
    return (
        <div>
            <h3>{collectionObj.categoryName}</h3>
            <PhotoList photoList={photoList} userId={userId}/>
        </div>
    );
}

export default Collection;