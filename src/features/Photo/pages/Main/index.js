
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';
import {useSelector} from 'react-redux';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
import PhotoModal from 'features/Photo/components/PhotoModal';


function Main(){
    const photos = useSelector(state => state.photos);
    const author = useSelector(state=>state.author);
    const user = useSelector(state=>state.user);
    const currentUserUid = user.currentUser?user.currentUser.uid:null;
    const showPhotoModal = useSelector(state=>state.photoModal.isOpen);

    if(!author.isLoading && author !== null){
        const elements = user.currentUser!==null?photos.photoList.filter(photo=>photo.author !== user.currentUser.uid).map((photo) => {
                let photoAuthor = author.authorList.find(item => item.uid === photo.author);
                return (<PhotoCard currentUserUid={currentUserUid} author={photoAuthor} key={photo._id} photo={photo}/>);
            }):photos.photoList.map((photo) => {
                let photoAuthor = author.authorList.find(item => item.uid === photo.author);
                return (<PhotoCard currentUserUid={currentUserUid} author={photoAuthor} key={photo._id} photo={photo}/>);
            });
        return (
            <div className="photo-main">
                <Banner author="unknow" backgroundUrl={Images.pocket_banner}/>
                
                <PhotoList photoList={elements}/>
                {showPhotoModal?<PhotoModal/>:null}
            </div>)
    }
    else{
        return (<LoadingComponent/>)
    }
}

export default Main;