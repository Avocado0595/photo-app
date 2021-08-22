import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';

const PhotoModal = (props) => {
    const {content, okAction} = props;
    const dispatch = useDispatch();
    const isOpen = useSelector(state=>state.ConfirmToggle.isOpen);
    const itemId = useSelector(state=>state.ConfirmToggle.itemId);
    const toggle = useCallback(()=>dispatch(confirmActions.closeModal()),[dispatch]);
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            {PhotoComponent}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PhotoModal;