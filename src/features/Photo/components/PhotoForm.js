import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Spinner } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import checkUrl from 'url-exist';

import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import PhotoField from 'custom-fields/PhotoField';
import collectionApi from 'api/collectionApi';
import photoApi from 'api/photoApi';
import { addCollection } from 'features/Collection/CollectionSlice';
import { addPhoto, editPhoto } from '../photoSlice';
import './PhotoForm.scss';
import ErrorModal from 'features/User/component/errorModal/ErrorModal';
PhotoForm.propTypes = {
    title: PropTypes.string,
    collectionId: PropTypes.string,
    collectionName: PropTypes.string,
    photoUrl: PropTypes.string
};
function PhotoForm(props) {
    const {initialValues, toggle, isEdit, editedPhoto} = props; 
    const dispatch = useDispatch();
    const currentUserUid = useSelector(state=>state.user.currentUser.uid);
    const collections = useSelector(state=>state.collection.collections);
    const validationSchema = yup.object().shape({
        title:yup.string().required('This field is required'),
        collectionId: yup.string().required('This field is required'),
        photoUrl: yup.string().required('This field is required').test('checkUrl','Invalid Url',(photoUrl)=>{
                return checkUrl(photoUrl);
        })
    })
    const onSubmit = useCallback((values)=>{
        try{
            const isExist = collections.find((item)=>item.value === values.collectionId);
            if(!isExist){
                collectionApi.postCollection({collectionId:values.collectionId, collectionName: values.collectionName, author: currentUserUid});
                dispatch(addCollection({value:values.collectionId, label: values.collectionName}));
            }
            if(!isEdit){ 
                photoApi.postPhoto(values);
                dispatch(addPhoto(values));
            }
            else{
                photoApi.updatePhoto(editedPhoto._id,values);
                dispatch(editPhoto(editedPhoto));  
            }

            toggle();
        }
        catch(error){
            console.log('post data failed: ', error);
          }

    }, [toggle, currentUserUid, collections, dispatch, isEdit, editedPhoto ]);
    return (
        <div className="form-layout">
               <Formik initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {
                formikProps =>{
                    const {isSubmitting} = formikProps;
                    return (
                        <Form>
                            <FastField 
                                name="title"
                                component={InputField}
                                label="Title"
                                placeholder="Eg: input..."
                            />
                            <FastField 
                                name="collectionId"
                                component={SelectField}
                                label="Photo collection"
                                placeholder="Choose your collection..."
                            />
                            <FastField 
                                name="photoUrl"
                                component={PhotoField}
                                label="Photo"
                            />
                            <FormGroup>
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} {!isEdit?"Add to album":"Save your change"}</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
        <ErrorModal/>
        </div>
    );
}

export default PhotoForm;