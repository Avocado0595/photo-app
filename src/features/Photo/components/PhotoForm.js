import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Button, Spinner } from 'reactstrap';
//import photoCategory from 'constants/photoCategory';

import { Formik, Form, FastField } from 'formik';
import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/SelectField';
import PhotoField from 'custom-fields/PhotoField';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import './PhotoForm.scss';
import categoryApi from 'api/categoryApi';
import photoApi from 'api/photoApi';
import { useSelector } from 'react-redux';
PhotoForm.propTypes = {
    title: PropTypes.string,
    categoryId: PropTypes.string,
    categoryName: PropTypes.string,
    photoUrl: PropTypes.string
};

function PhotoForm(props) {
    const {initialValues, toggle} = props; 
    const {photoId} = useParams();
    const isAddPhoto = !photoId;
    const currentUserUid = useSelector(state=>state.user.currentUser.uid);
    const categoryList = useSelector(state=>state.category.category);
    
    const validationSchema = yup.object().shape({
        title:yup.string().required('This field is required'),

        categoryId: yup.string().required('This field is required').nullable(),

        photoUrl: yup.string().required('This field is required')
    })

    const onSubmit = useCallback(async (values)=>{
      
        try{
            //check new category
            console.log(values);
            const isExist = await categoryList.find((item)=>item.value === values.categoryId);
            if(!isExist)
                await categoryApi.postCategory({categoryId:values.categoryId, categoryName: values.categoryName, author: currentUserUid});
            await photoApi.postPhoto(values);
            toggle();
        }
        catch(error){
            console.log('post data failed: ', error);
          }

    }, [toggle, currentUserUid, categoryList]);
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
                                <Button type="submit" color="primary"> {isSubmitting&&<Spinner size="sm" children=""/>} {isAddPhoto?"Add to album":"Save your change"}</Button>
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