import React from 'react';
import { Modal, ModalHeader} from 'reactstrap';

function MyModal(props) {
    const {modal, component, closeModal, header} = props;
    return (
        <Modal isOpen={modal} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>{header}</ModalHeader>
        {component}
    </Modal>
    );
}

export default MyModal;