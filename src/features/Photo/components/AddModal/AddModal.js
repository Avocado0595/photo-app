import React, {useState} from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import PhotoForm from '../PhotoForm';
import Images from 'constants/images';
import './AddModal.scss';
import {auth} from '../../../../firebase/Firebase';
function AddModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = ()=>setModal(!modal);
    const initialValues = {
        title: '',
    categoryId:'',
    photoUrl: '',
    author: auth.currentUser.uid
    }
    return (
        <>
        <button onClick={toggle} className="add-photo"><p>Add new photo</p><img alt="add" className="add-photo__img" src={Images.add}/></button>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>AddPhoto</ModalHeader>
        <PhotoForm initialValues={initialValues} toggle={toggle}/>
    </Modal>
    </>
    );
}

export default AddModal;