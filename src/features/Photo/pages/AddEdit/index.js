import React from 'react';
import Banner from 'components/Banner';
import Images from 'constants/images';

import './AddEdit.scss';
import PhotoForm from 'features/Photo/components/PhotoForm';
AddEdit.propTypes = {
    
};

function AddEdit() {
    return (
        <div className="photo-edit">
            <Banner title="Edit Images Here!!!" backgroundUrl={Images.banner1}/>
            <div className="photo-edit__form">
                <PhotoForm onSubmit={value=>console.log(value)}/>
            </div>
        </div>
    );
}

export default AddEdit;