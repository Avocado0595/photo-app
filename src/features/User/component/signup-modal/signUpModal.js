import {useState} from 'react';
import { Button} from 'reactstrap';
import MyModal from '../modal/MyModal';
import '../signin-modal/signinModal.scss';
import Signup from '../SignUp';

function SignupModal(props) {
    const {hiddenBtn} = props;
    const initState = props.modal===true?props.modal:false
   const [modal, setModal] = useState(initState);
    const toggle = () => setModal(!modal);
    return (<div>
        {hiddenBtn??<Button outline color="success" onClick={toggle}>Sign Up</Button>}
        <MyModal toggle={toggle} modal={modal} component={<Signup/>}/>
    </div>
    );
}

export default SignupModal;