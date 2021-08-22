
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoCard from 'features/Photo/components/PhotoCard';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';
import { useSelector } from 'react-redux';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
Main.protoTypes = {};

function Main(){
    const authorList = useSelector(state=>state.author.authorList);
    const photos = useSelector(state => state.photos.photoList);
    const isLoading = useSelector(state=>state.author.isLoading);

   
    if(!isLoading){
    const elements = photos.map((photo) => {
            let author = authorList.find(item => item.userId === photo.author);
            return (<PhotoCard authorName={author?author.userName:null} key={photo._id} photo={photo} />);
        });
    return (
        <div className="photo-main">
            <Banner author="unknow" backgroundUrl={Images.pocket_banner}/>
            <PhotoList photoList={elements}/>
            <button>Load more</button>
        </div>
    )
    }
    else{
        return (<LoadingComponent/>)
    }
}

export default Main;