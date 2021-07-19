import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './RandomPhoto.scss';
RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl:PropTypes.string,
    onImgUrlChange: PropTypes.func,
    onRandomBtnBlur: PropTypes.func
};
RandomPhoto.defaultProps = {
    name: '',
    imageUrl:'',
    onImgUrlChange: null,
    onRandomBtnBlur: null
};
function getRamdomImgUrl(){
    let randomId = (Math.floor(Math.random()*2000));
    return `https://picsum.photos/id/${randomId}/300/400`;
}
function RandomPhoto(props) {
    const {name, imageUrl, onImgUrlChange, onRandomBtnBlur} = props;
    console.log(imageUrl);
    const handleRandomPhotoClick = async()=>{
        if (onImgUrlChange){
            const randomImgUrl = getRamdomImgUrl();
            onImgUrlChange(randomImgUrl);
        }
    }
    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button outline color="primary"
                name={name}
                onBlur={onRandomBtnBlur}
                onClick={handleRandomPhotoClick}
                >Random a photo</Button>
            </div>
            <div className="random-photo__img">
                <img width="200px" height="200px" src={imageUrl===''?'https://picsum.photos/id/19/300/400':imageUrl} alt='Random file not found!!!' />
            </div>
        </div>
    );
}

export default RandomPhoto;