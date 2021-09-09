import userApi from 'api/userApi';
import Images from 'constants/images';
import { setCurrentUser } from 'features/User/UserSlice';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, FormGroup, Input, Label, Form, Spinner, Col } from 'reactstrap';

import './EditProfile.scss';
function EditProfile() {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state=>state.user.currentUser);
    const [imgPreview, setImgPreview] = useState(null);
    const [inputName, setInputName] = useState(currentUser.displayName);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        let formData = new FormData();
        formData.append('photoURL', imgPreview);
        formData.append('displayName', inputName);
        await userApi.updateUser(currentUser.uid,formData);
        const databaseUser = await userApi.getOne(currentUser.uid);
        setIsSubmitting(false);
        dispatch(setCurrentUser({googleUser:null, databaseUser:databaseUser}));
        history.push(`/${currentUser.uid}`);
      }
      const handleCancleClick = ()=>{
        history.push('/');
      }
    return (
        
        <Form className="edit-profile-layout" onSubmit={handleSubmit}>
                <FormGroup className="edit-profile-layout__avatar">
                  <img alt="avatar" className="edit-profile-layout__avatar--img" src={!imgPreview ? currentUser.photoURL !== '' ? currentUser.photoURL : Images.user : URL.createObjectURL(imgPreview)} />

                  <div className="edit-profile-layout__avatar--edit">
                    <label className="edit-profile-layout__avatar--edit--icon" for="avatarPath"><img className="small-icon" alt="edit" src={Images.editAva} /></label>
                    <input onChange={(e) => setImgPreview(e.target.files[0])} type="file" name="avatarPath" id="avatarPath" accept=".png, .jpeg, .jpg" />
                  </div>
                </FormGroup>
                <FormGroup row className="edit-profile-data">
                    <Label className="edit-field-label" for="displayName" xs={4} sm={4}>Display name: </Label>
                    <Col xs={6} sm={8}>
                    <Input onChange={(e)=>setInputName(e.target.value)} id="displayName" name="displayName" type="text" value={inputName}/>
                    </Col>
        
                </FormGroup>
                <FormGroup row className="edit-profile-data">
                    <Label className="edit-field-label" for="email" xs={4} sm={4}>Email: </Label>
                    <Col xs={6} sm={8}>
                    <Input disabled value={currentUser.email}/>
                    </Col>
        
                </FormGroup>
                <FormGroup row>
                <Col sm={4}>
                   
                    </Col>
                <Col sm={8}>
                <Button className="edit-profile-btn" type="submit">{isSubmitting&&<Spinner size="sm" children=""/>} Save change</Button>
                  <Button onClick={handleCancleClick} className="edit-profile-btn" color="danger" type="button">Cancel</Button>

                    </Col>
                </FormGroup>
                {/* <Form>
<FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="filePath" id="exampleFile" />
      </FormGroup>
      <img src={currentUser.photoURL}/>
      <Button type="submit">Upload</Button>
    </Form> */}
            </Form>
           
    );
}

export default EditProfile;