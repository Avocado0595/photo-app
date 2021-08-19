import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader} from 'reactstrap';
import PhotoForm from '../PhotoForm';
import Images from 'constants/images';
import './AddModal.scss';
import {auth} from '../../../../firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import categoryApi from 'api/categoryApi';
import { setCategory } from 'features/Category/CategorySlice';
function AddModal() {
    const categoryList = useSelector(state=>state.category.category);
    const [modal, setModal] = useState(false);
    const toggle = ()=>setModal(!modal);
    const initialValues = {
        title: '',
    categoryId:'',
    photoUrl: '',
    author: auth.currentUser.uid
    }
    //
    const currentUserUid =auth.currentUser.uid;
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCategoryList=  async() =>{
            try{
            const data = await categoryApi.getAll();
            const categoryOptions = await data?data.filter((item)=>item.author === currentUserUid).map(item=>{
                return{
                    value: item.categoryId,
                    label: item.categoryName
                }}):null;
           
            dispatch(setCategory(categoryOptions));
            }
            catch(error){
              console.log('Fetch category failed: ', error);
            }
          };
          fetchCategoryList();
    },[dispatch, categoryList, currentUserUid])

    //
    return (
        <>
        <button onClick={toggle} className="add-photo"><p>Add new photo</p><img alt="add" className="add-photo__img" src={Images.add}/></button>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>AddPhoto</ModalHeader>
        <PhotoForm initialValues={initialValues} toggle={toggle}/>
    </Modal>
    </>
    );
}

export default AddModal;