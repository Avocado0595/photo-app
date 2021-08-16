import React from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import Signin from '../Signin';
function MyModal(props) {
    const {modal, toggle, component} = props;
    return (
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        {component}
    </Modal>
    );
}

export default MyModal;