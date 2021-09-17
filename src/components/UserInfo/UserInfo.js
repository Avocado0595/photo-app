import Images from 'constants/images';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { photoModalActions } from 'utils/ModalSlice/PhotoModalSlice';
import './UserInfo.scss';

function UserInfo(props) {
    const {userName, avatar, userLink} = props;
    const dispatch = useDispatch();
    const toggle = useCallback(()=>dispatch(photoModalActions.closeModal()),[dispatch]);
    return (
        <Link onClick={toggle} to={userLink}>
            <img className="small-icon-avatar" src={avatar!==''?avatar:Images.user} />{userName}
        </Link>
    );
}

export default UserInfo;