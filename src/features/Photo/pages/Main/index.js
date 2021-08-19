
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';
import { useSelector } from 'react-redux';

Main.protoTypes = {};

function Main(){
    const authorList = useSelector(state=>state.user.otherAuthors);
    const photos = useSelector(state => state.photos.photoList);

    const elements = photos.map((photo) => {
        let author = authorList.find(item => item.userId === photo.author);
        return (<PhotoCard authorName={author.userName} key={photo._id} photo={photo} />);
    });
//TODO: pass author for banner
    return (
        <div className="photo-main">
            <Banner author="unknow" backgroundUrl={Images.pocket_banner}/>
            <PhotoList photoList={elements}/>
        </div>
    )
}

export default Main;