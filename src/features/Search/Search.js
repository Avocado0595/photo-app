
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
import { getPhotoFail, getPhotoProcess, getPhotoSuccess } from './SearchSlice';
import photoApi from 'api/photoApi';
import './Search.scss';
import PhotoModal from 'features/Photo/components/PhotoModal';

function Search() {
    const dispatch = useDispatch();
    const showPhotoModal = useSelector(state=>state.photoModal);
    const searchPhoto = useSelector(state => state.search);
    const author = useSelector(state => state.author);
    const user = useSelector(state => state.user);
    const currentUserUid = user.currentUser? user.currentUser.uid:null;
    useEffect(() => {
        const getPhoto = async (keyword) => {
            dispatch(getPhotoProcess);
            const data = await photoApi.searchPhoto(keyword);
            data ? dispatch(getPhotoSuccess(data)) : dispatch(getPhotoFail());
        }
        getPhoto(searchPhoto.keyword);

    }, [dispatch, searchPhoto.keyword]);
    if (author.isLoading || searchPhoto.isLoading) {
        return (<LoadingComponent />);
    }
    else {
       
        const elements = searchPhoto.photos.map((photo) => {
            let photoAuthor = author.authorList.find(item => item.uid === photo.author);
            return (<PhotoCard currentUserUid={currentUserUid} author={photoAuthor} key={photo._id} photo={photo} />);
        });
        return (
            <div className="container">
                <h5 className="search-title">Search result for: {searchPhoto.keyword}</h5>
                {elements.length !== 0 ? <PhotoList photoList={elements} /> : <h5>Sorry! We found nothing!</h5>}
                {showPhotoModal.isOpen?<PhotoModal/>:null}
            </div>)}
    
}

export default Search;