import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./UserProfile.scss";
import userApi from 'api/userApi';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
function UserProfile(props) {
    //const currentUser = useSelector(state=>state.user.currentUser);
    const uid = props.userUid;
    const [currentUser, setUserProfile] = useState();
    const [loadingUser, setLoadingUser] = useState(true);
    useEffect(()=>{
        const getOtherUser = async(uid)=> {
            setLoadingUser(true);
            const user = await userApi.getOne(uid);
            setUserProfile(user.user);
            setLoadingUser(false);
        }

        getOtherUser(uid);

    }
       , [uid] )
       if(!loadingUser){
    return (
        <div className="profile-layout">
            <div className="profile-layout__avatar">
                {/* <div className="profile-layout__avatar--edit"><img className="profile-layout__avatar--edit--icon" src={Images.edit}/></div> */}
                <img className="profile-layout__avatar--img" src={currentUser.photoURL?currentUser.photoURL:Images.user}/>
            </div>
            <div className="profile-data">
                <h4>{currentUser.displayName}</h4>
                <p>Email: {currentUser.email} </p>
            </div>
        </div>
    );
       }
       else
       return (<LoadingComponent/>)
}

export default UserProfile;