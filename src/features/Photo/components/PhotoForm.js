import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Spinner } from 'reactstrap';

import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import PhotoField from 'custom-fields/PhotoField';
import * as yup from 'yup';
import './PhotoForm.scss';
import categoryApi from 'api/categoryApi';
import photoApi from 'api/photoApi';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection } from 'features/Collection/CollectionSlice';
import { addPhoto, editPhoto } from '../photoSlice';
PhotoForm.propTypes = {
    title: PropTypes.string,
    categoryId: PropTypes.string,
    categoryName: PropTypes.string,
    photoUrl: PropTypes.string
};

function PhotoForm(props) {
    const {initialValues, toggle, isEdit, editedPhoto} = props; 
    const dispatch = useDispatch();
    const currentUserUid = useSelector(state=>state.user.currentUser.uid);
    const collections = useSelector(state=>state.collection.collections);
    const validationSchema = yup.object().shape({
        title:yup.string().required('This field is required'),

        categoryId: yup.string().required('This field is required').nullable(),

        photoUrl: yup.string().required('This field is required')
    })

    const onSubmit = useCallback((values)=>{
      
        try{
            const isExist = collections.find((item)=>item.value === values.categoryId);
            if(!isExist){
                categoryApi.postCategory({categoryId:values.categoryId, categoryName: values.categoryName, author: currentUserUid});
                dispatch(addCollection({value:values.categoryId, label: values.categoryName}));
            }
            if(!isEdit){ 
                photoApi.postPhoto(values);
                console.log(values);
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
            validationSchema={validationSchema}
           
        >
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
                                name="categoryId"
                                component={SelectField}
                                label="Photo Category"
                                placeholder="Choose your category..."
                                // options = {categoryList}
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
        </div>
     
 
    );
}

export default PhotoForm;
//