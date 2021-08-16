
import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';

Main.protoTypes = {};

function Main(){
    //const dispatch =useDispatch();
    // const handleEditPhoto = (photo) =>{
    //     const editUrl = `/photos/${photo.id}`;
    //     history.push(editUrl);
    // }
    // const handleRemovePhoto = (photo)=>{
    //     const action = removePhoto(photo.id);
    //     dispatch(action);
    //}
//TODO: pass author for banner
    return (
        <div className="photo-main">
            <Banner author="unknow" backgroundUrl={Images.pocket_banner}/>
            <PhotoList/>
        </div>
    )
}

export default Main;