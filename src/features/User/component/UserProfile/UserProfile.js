import React from 'react';
import Images from 'constants/images';
import "./UserProfile.scss";
import { useSelector } from 'react-redux';
function UserProfile(props) {

    const uid = props.userUid;
    const authorList = useSelector(state => state.author.authorList);
    const currentAuthor = authorList.find(a => a.uid === uid);

    return (
        <div className="profile-layout">
            <div className="profile-layout__avatar">
                <img alt="avatar" className="profile-layout__avatar--img" src={currentAuthor.photoURL ?
                    currentAuthor.photoURL.includes('avatars') ?
                        `${process.env.REACT_APP_API_URL_IMG}${currentAuthor.photoURL}` : currentAuthor.photoURL : Images.user} />
            </div>
            <div className="profile-data">
                <h4>{currentAuthor.displayName}</h4>
                <p>Email: {currentAuthor.email} </p>
            </div>
        </div>
    );

}

export default UserProfile;