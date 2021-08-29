import Images from 'constants/images';
import React from 'react';
import { useSelector } from 'react-redux';
import "./UserProfile.scss";
function UserProfile() {
    const user = useSelector(state=>state.user.currentUser);
    return (
        <div className="profile-layout">
            <h4>{user.displayName}</h4>
            <div className="profile-layout__avatar">
                <div className="profile-layout__avatar--edit"><img className="profile-layout__avatar--edit--icon" src={Images.edit}/></div>
                <img className="profile-layout__avatar--img" src={user.photoURL}/></div>
        </div>
    );
}

export default UserProfile;