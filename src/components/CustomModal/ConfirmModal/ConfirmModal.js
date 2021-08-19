import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirmActions } from 'utils/ModalSlice/ConfirmModalSlice';

const ConfirmModal = (props) => {
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
            {content}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={()=>{
              toggle();
              console.log(itemId);
              okAction(itemId);
          }}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModal;