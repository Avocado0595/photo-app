import React from 'react';
import './UserPopup.scss';

function UserPopup() {
    return (
        <div className="userpopup-layout">
            <ul className="userpopup-list">
                <li className="userpopup-item">Profile</li>
                <li className="userpopup-item">Account setting</li>
                <li className="userpopup-item">Log out</li>
            </ul>
        </div>
    )
}
export default UserPopup;