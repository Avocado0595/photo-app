import React from 'react';

function AddLikeBtn(props) {
    return (
        <div className="control-group">
        <button onClick={() => handleLike(_id, currentUserUid)} className="control__btn"><img alt="like" className="control__btn--img small-icon" src={isLiked ? Images.liked : Images.unlike} /></button>
        <button onClick={() => hanldeAddFromOtherUser(_id)} className="control__btn"><img alt="add" className="control__btn--img small-icon" src={Images.plus} /></button>
    </div>
    );
}

export default AddLikeBtn;