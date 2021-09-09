import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import {errorActions} from 'utils/ModalSlice/ErrorModalSlice';
function ErrorModal(props) {
    const dispatch = useDispatch();
    const closeToggle = useCallback(()=>dispatch(errorActions.closeModal()),[dispatch]);
    const {isOpen} = props;
    const errMessage = useSelector(state=>state.ErrorToggle.errMessage);
    return (
           <Modal isOpen={isOpen} toggle={closeToggle}>
               <ModalHeader toggle={closeToggle}>Error</ModalHeader>
                <ModalBody>
                    {errMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={closeToggle}>Close</Button>
                </ModalFooter>
            </Modal>
    );
}

export default ErrorModal;