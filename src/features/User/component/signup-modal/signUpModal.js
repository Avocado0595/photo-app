import { useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signUpActions } from 'utils/ModalSlice/SignUpModalSlice';
import MyModal from '../modal/MyModal';
import '../signin-modal/signinModal.scss';
import Signup from '../SignUp';

function SignupModal() {
    const modal = useSelector(state=>state.signUpToggle.isOpen);
    const dispatch = useDispatch();
    const close = useCallback(()=> dispatch(signUpActions.closeModal()), [dispatch]);
    return (<div>
        <MyModal modal={modal} component={<Signup/>} closeModal={close} header="Sign Up"/>
    </div>
    );
}

export default SignupModal;