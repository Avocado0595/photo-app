
import MyModal from '../modal/MyModal';
import './signinModal.scss';
import Signin from '../Signin';
import { useSelector, useDispatch } from 'react-redux';
import {signInActions} from 'utils/ModalSlice/SignInModalSlice';
import { useCallback } from 'react';
function SigninModal() {
    const modal = useSelector(state=>state.signInToggle.isOpen);
    const dispatch = useDispatch();
    console.log('[header-modal]: ', modal);
    const close = useCallback(()=> dispatch(signInActions.closeModal()), [dispatch]);
    return (<div>
        <MyModal modal={modal} component={<Signin/>} closeModal={close} header="Sign In"/>
        
    </div>
    );
}

export default SigninModal;