import React, { useEffect, useState } from 'react';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
import userApi from 'api/userApi';
import Images from 'constants/images';
import "./UserProfile.scss";
function UserProfile(props) {

    const uid = props.userUid;
    const [currentUser, setUserProfile] = useState();
    const [loadingUser, setLoadingUser] = useState(true);
    useEffect(() => {
        const getOtherUser = async (uid) => {
            setLoadingUser(true);
            const user = await userApi.getOne(uid);
            setUserProfile(user.user);
            setLoadingUser(false);
        }
        getOtherUser(uid);
    },[uid])
    if (!loadingUser) {
        return (
            <div className="profile-layout">
                <div className="profile-layout__avatar">
                    <img alt="avatar" className="profile-layout__avatar--img" src={currentUser.photoURL ? currentUser.photoURL : Images.user} />
                </div>
                <div className="profile-data">
                    <h4>{currentUser.displayName}</h4>
                    <p>Email: {currentUser.email} </p>
                </div>
            </div>
        );
    }
    else
        return (<LoadingComponent />)
}

export default UserProfile;