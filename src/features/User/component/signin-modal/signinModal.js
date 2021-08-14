import {useState} from 'react';
import { Button, Modal, ModalHeader} from 'reactstrap';
import MyModal from '../modal/MyModal';
import Signin from '../Signin';
import './signinModal.scss';


function SigninModal(props) {
    const {hiddenBtn} = props;
    const initState = props.modal===true?props.modal:false
   const [modal, setModal] = useState(initState);
    const toggle = () => setModal(!modal);
    return (<div>
        {hiddenBtn??<Button color="primary" onClick={toggle}>Sign In</Button>}
        <MyModal toggle={toggle} modal={modal}/>
    </div>
    );
}

export default SigninModal;