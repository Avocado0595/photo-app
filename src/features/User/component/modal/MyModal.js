import React from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import Signin from '../Signin';
function MyModal(props) {
    const {modal, toggle} = props;
    return (
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        <Signin toggleModal = {toggle}/>
    </Modal>
    );
}

export default MyModal;