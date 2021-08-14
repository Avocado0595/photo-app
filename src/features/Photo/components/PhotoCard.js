import Images from 'constants/images';
import React, { useState } from 'react';
import './PhotoCard.scss';
import {auth} from '../../../firebase/Firebase';
import SigninModal from 'features/User/component/signin-modal/signinModal';
import MyModal from 'features/User/component/modal/MyModal';

function PhotoCard(props) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const {photo, handleEditPhoto, handleRemovePhoto} = props;
    const {imgUrl, title, id} = photo;
    const onEditClick = ()=>{
        if (handleEditPhoto) handleEditPhoto(photo);
    }
    const onRemoveClick = ()=>{
        if (handleRemovePhoto) handleRemovePhoto(photo);
    }
    const handleOnClick = ()=>{
        if(!auth.currentUser)
        {
            setModal(!modal);
        }
    }
    return (
         
        <div className="row">
            <div className="col-md-12 px-0">
                <MyModal toggle={toggle} modal={modal}/>
                <div className="photo-card rounded-lg overflow-hidden">
                <div className="modal-group">
                            <button onClick={handleOnClick} className="control__btn"><img className="control__btn--img small-icon" src={Images.like} /></button>
                            <button onClick={handleOnClick} className="control__btn"><img className="control__btn--img small-icon" src={Images.plus} /></button>
                        </div>
                    <img src={imgUrl} className="img-fluid " alt='alt'></img>
                    <div className="modal-group author">
                            <a href="/">
                                <img alt="avatar" />
                                <p>author's name</p>

                            </a>
                        </div>
                    <div className="photo-card__modal">
                        
                       
                    </div>
                </div>
            </div>
        </div>
           
           
           
        // </div>
    );
     // <div key={id} className="photo-card col-md-4 col-sm-6 col-xs-6">
        //     <div className="photo-card__img-layout" >
        //         <img className="photo-card__img" src={imgUrl} alt={title}/>
        //     </div>
}
//

export default PhotoCard;