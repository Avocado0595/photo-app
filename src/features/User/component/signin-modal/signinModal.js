
import {useState} from 'react';
import { Button} from 'reactstrap';
import MyModal from '../modal/MyModal';
import './signinModal.scss';
import Signin from '../Signin';


function SigninModal(props) {
    const {hiddenBtn} = props;
    const initState = props.modal===true?props.modal:false
   const [modal, setModal] = useState(initState);
    const toggle = () => setModal(!modal);
    return (<div>
        {hiddenBtn??<Button color="primary" onClick={toggle}>Sign In</Button>}
        <MyModal toggle={toggle} modal={modal} component={<Signin toggleModal = {toggle}/>}/>
        
    </div>
    );
}

export default SigninModal;